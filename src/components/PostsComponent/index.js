import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PostItem from '../PostItem'
import HomeFailureView from '../HomeFailureView'
import InstaShareContext from '../../context/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Cookies.remove('jwt_token')
const PostsComponent = () => {
  const {searchInput} = React.useContext(InstaShareContext)
  const [postsApi, setPostsApi] = useState({
    postsApiStatus: apiStatusConstants.initial,
    postsData: [],
  })

  const getPostsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    setPostsApi(prev => ({
      ...prev,
      postsApiStatus: apiStatusConstants.inProgress,
    }))
    const url = 'https://apis.ccbp.in/insta-share/posts'
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = data.posts.map(each => ({
        comments: each.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        postCaption: each.post_details.caption,
        postImgUrl: each.post_details.image_url,
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
        likesCount: each.likes_count,
        createdAt: each.created_at,
      }))
      setPostsApi({
        postsApiStatus: apiStatusConstants.success,
        postsData: formattedData,
      })
      console.log(response, formattedData)
    } else {
      setPostsApi({
        postsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getPostsData()
  }, [])

  const retryFunction = () => {
    getPostsData()
  }

  const LoadingView = () => (
    <div className="posts-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderPosts = () => (
    <ul className="posts-list-card">
      {postsApi.postsData.map(each => (
        <PostItem key={each.postId} postDetails={each} />
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div className="posts-Failureview-card">
      <HomeFailureView retryFunction={retryFunction} />
    </div>
  )

  const renderpostsView = () => {
    switch (postsApi.postsApiStatus) {
      case apiStatusConstants.inProgress:
        return LoadingView()
      case apiStatusConstants.success:
        return renderPosts()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderpostsView()
}
export default PostsComponent
