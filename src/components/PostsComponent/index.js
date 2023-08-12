import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PostsComponent = () => {
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

  const renderPosts = () => (
    <ul className="posts-list-card">
      {postsApi.postsData.map(each => {
        const {
          comments,
          postCaption,
          postId,
          postImgUrl,
          profilePic,
          userId,
          userName,
        } = each
        return (
          <li className="post-item-card" key={postId}>
            <div className="post-item-userName-card">
              <img
                src={profilePic}
                alt="post author profile"
                className="post-item-profile-img"
              />
              <p className="post-item-userName">{userName}</p>
            </div>
            <img src={postImgUrl} alt="post" className="post-item-post-img" />
          </li>
        )
      })}
    </ul>
  )

  return (
    <ul className="posts-list-card">
      {postsApi.postsData.map(each => (
        <PostItem key={each.postId} postDetails={each} />
      ))}
    </ul>
  )
}
export default PostsComponent
