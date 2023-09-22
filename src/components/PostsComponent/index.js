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
  const {
    searchInput,
    searchCount,
    changeSearchedList,
    SearchedList,
    isDarkTheme,
  } = React.useContext(InstaShareContext)
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
    const url1 = 'https://apis.ccbp.in/insta-share/posts'
    const url2 = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const url = searchCount > 0 ? url2 : url1
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
      changeSearchedList(formattedData)
      console.log(response, formattedData)
    } else {
      setPostsApi({
        postsApiStatus: apiStatusConstants.failure,
      })
    }
  }
  console.log(searchCount)
  useEffect(() => {
    getPostsData()
  }, [searchInput, searchCount])

  const retryFunction = () => {
    getPostsData()
  }
  const theme = isDarkTheme ? 'posts-dark-theme' : 'posts-light-theme'
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'

  const LoadingView = () => (
    <div className={`posts-loader-container ${theme}`} data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderSearchHeading = () =>
    searchCount > 0 && (
      <div className="search-results-heading-card">
        <div className="search-results-width-card">
          <h1 className={`search-results-heading ${textColor}`}>
            Search Results
          </h1>
        </div>
      </div>
    )

  const renderPosts = () => (
    <>
      {renderSearchHeading()}
      <ul className="posts-list-card">
        {postsApi.postsData.map(each => (
          <PostItem key={each.postId} postDetails={each} />
        ))}
      </ul>
    </>
  )

  const renderNosearchResults = () => (
    <div className="no-Search-results-View">
      <img
        src="https://res.cloudinary.com/dcbdcornz/image/upload/v1693814962/instaShare-urls/Group_no-search_xtnnb5.png"
        className="no-search-results-img"
        alt="search not found"
      />
      <h1 className="no-search-results-heading">Search Not Found</h1>
      <p className="no-search-results-description">
        Try different keyword or search again
      </p>
    </div>
  )

  const renderFailureView = () => (
    <div className={`posts-Failureview-card ${theme}`}>
      <HomeFailureView retryFunction={retryFunction} />
    </div>
  )

  const renderPostsView = () =>
    SearchedList.length === 0 && searchCount !== 0
      ? renderNosearchResults()
      : renderPosts()

  const renderpostsView = () => {
    switch (postsApi.postsApiStatus) {
      case apiStatusConstants.inProgress:
        return LoadingView()
      case apiStatusConstants.success:
        return renderPostsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderpostsView()
}
export default PostsComponent
