import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const HomeRoute = () => {
  const [storiesApi, setStoriesApi] = useState({
    storiesApiStatus: apiStatusConstants.initial,
    storiesData: null,
  })

  const [postsApi, setPostsApi] = useState({
    postsApiStatus: apiStatusConstants.initial,
    postsData: null,
  })

  const getStoriesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    setStoriesApi(prev => ({
      ...prev,
      storiesApiStatus: apiStatusConstants.inProgress,
    }))
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response, data)
    if (response.ok) {
      const formattedData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
      }))
      setStoriesApi({
        storiesApiStatus: apiStatusConstants.success,
        storiesData: formattedData,
      })
    } else {
      setStoriesApi({storiesApiStatus: apiStatusConstants.failure})
    }
  }
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
    console.log(response, data)
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
    } else {
      setPostsApi({
        postsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getStoriesData()
  }, [])

  useEffect(() => {
    getPostsData()
  }, [])

  return <Header />
}
export default HomeRoute
