import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import InstaShareContext from '../../context/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UserDetails = props => {
  const {isDarkTheme} = React.useContext(InstaShareContext)
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    userData: [],
  })
  const {match} = props
  console.log(match)
  const {path} = match
  console.log(path)
  const {params} = match
  const {id} = params
  console.log(id, path)
  console.log('x------')

  const getUserData = async () => {
    setApiDetails(prev => ({
      ...prev,
      apiStatus: apiStatusConstants.inProgress,
    }))
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
    console.log(response, 'l')
    if (response.ok && response.status !== 400) {
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
      console.log(response, 'lwwww')
      setApiDetails({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const onClickRetry = () => {
    getUserData()
  }
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'
  const profileImgAlt = path === '/users/:id' ? 'user profile' : 'my profile'
  const storyImgAlt = path === '/users/:id' ? 'user story' : 'my story'
  const postImgAlt = path === '/users/:id' ? 'user post' : 'my post'

  const {userData} = apiDetails

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderUserBio = () => {
    const {userBio, userId} = userData
    return (
      <>
        <p className={`profile-user-id ${textColor}`}>{userId}</p>
        <p className={`profile-bio ${textColor}`}>{userBio}</p>
      </>
    )
  }

  const renderposts = () => {
    const {posts, stories} = userData
    const posts2 = [...posts, ...stories] // here stories used in posts for presenting  purpose (because in database only 3 posts are available)
    return (
      <ul className="user-details-posts-list">
        {posts2.map(each => (
          <li className="user-details-post-item" key={each.id}>
            <img
              src={each.image}
              alt={postImgAlt}
              className="user-details-post-img"
            />
          </li>
        ))}
      </ul>
    )
  }

  const renderNoposts = () => (
    <div className="no-posts-view-card">
      <div className="camera-icon-card">
        <BiCamera className={`no-posts-camera-icon ${textColor}`} />
      </div>
      <h1 className={`no-posts-Text ${textColor}`}>No Posts</h1>
    </div>
  )

  const renderSuccessView = () => {
    const {
      followersCount,
      followingCount,
      // id,
      posts,
      postsCount,
      profilePic,
      stories,

      userName,
    } = userData
    return (
      <div className="user-details-bg-card">
        <div className="user-details-width-card">
          <div className="user-details-profile-card">
            <h1
              className={`user-frofile-name user-frofile-name-small ${textColor}`}
            >
              {userName}
            </h1>
            <div className="user-profile-pic-Card">
              <img
                src={profilePic}
                alt={profileImgAlt}
                className="user-profile-pic"
              />
              <div className="bio-counts-card">
                <p
                  className={`user-frofile-name user-frofile-name-lg ${textColor}`}
                >
                  {userName}
                </p>
                <div className="counts-card">
                  <div className="count-card">
                    <p className={`user-profile-count ${textColor}`}>
                      {postsCount}
                    </p>
                    <p className={`user-profile-count-name ${textColor}`}>
                      posts
                    </p>
                  </div>
                  <div className="count-card">
                    <p className={`user-profile-count ${textColor}`}>
                      {followersCount}
                    </p>
                    <p className={`user-profile-count-name ${textColor}`}>
                      followers
                    </p>
                  </div>
                  <div className="count-card">
                    <p className={`user-profile-count ${textColor}`}>
                      {followingCount}
                    </p>
                    <p className={`user-profile-count-name ${textColor}`}>
                      following
                    </p>
                  </div>
                </div>
                <div className="bio-lg">{renderUserBio()}</div>
              </div>
            </div>
            <div className="bio-smaall">{renderUserBio()}</div>
          </div>
          {stories.length > 0 ? (
            <ul className="stories-list-card">
              {stories.map(each => (
                <li className="storie-item" key={each.id}>
                  <img
                    src={each.image}
                    alt={storyImgAlt}
                    className="storie-img"
                  />
                </li>
              ))}
            </ul>
          ) : null}
          <hr className="user-details-hr" />
          <div className="user-posts-heading-card">
            <BsGrid3X3 className={`posts-icon ${textColor}`} />
            <h1 className={`user-posts-heading ${textColor}`}>Posts</h1>
          </div>
          {posts.length > 0 ? renderposts() : renderNoposts()}
        </div>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="user-details-failure-view">
      <img
        src="https://res.cloudinary.com/dcbdcornz/image/upload/v1694151297/instaShare-urls/Group_7522_swimg_tbfbik.png"
        alt="failure view"
        className="user-details-failureview-img"
      />

      <p className={`user-details-failureview-text ${textColor}`}>
        Something went wrong. Please try again
      </p>
      <button
        className="user-details-retry-btn"
        type="button"
        onClick={onClickRetry}
      >
        Try again
      </button>
    </div>
  )

  const renderUserDetailsView = () => {
    switch (apiDetails.apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderUserDetailsView()
}
export default withRouter(UserDetails)
