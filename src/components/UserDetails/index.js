import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UserDetails = props => {
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    userData: [],
  })

  const getUserData = async () => {
    setApiDetails(prev => ({
      ...prev,
      apiStatus: apiStatusConstants.inProgress,
    }))
    const {match} = props
    console.log(match)
    const {path} = match
    console.log(path)
    const {params} = match
    const {id} = params
    console.log(id, path)
    console.log('x------')
    const jwtToken = Cookies.get('jwt_token')
    const url1 = `https://apis.ccbp.in/insta-share/users/${id}`
    const url2 = 'https://apis.ccbp.in/insta-share/my-profile'
    const url = path === '/users/:id' ? url1 : url2
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responsedata = await response.json()

    if (response.ok) {
      const data =
        path === '/users/:id' ? responsedata.user_details : responsedata.profile

      const formattedData = {
        followersCount: data.followers_count,
        followingCount: data.following_count,
        id: data.id,
        posts: data.posts,
        postsCount: data.posts_count,
        profilePic: data.profile_pic,
        stories: data.stories,
        userBio: data.user_bio,
        userId: data.user_id,
        userName: data.user_name,
      }
      console.log(formattedData)
      setApiDetails({
        apiStatus: apiStatusConstants.success,
        userData: formattedData,
      })
    } else {
      setApiDetails({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getUserData()
  }, [0])

  //   const path = props.location.pathname
  const {location} = props
  const {pathname} = location
  const {path} = pathname

  return (
    <p>{path === '/users/:id' ? 'user Details Route' : 'my Profile Route'}</p>
  )
}
export default withRouter(UserDetails)
