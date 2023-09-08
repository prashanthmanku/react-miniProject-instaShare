import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

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

  const onClickRetry = () => {
    getUserData()
  }

  const {userData} = apiDetails
  const {
    followersCount,
    followingCount,
    // id,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = userData
  //   const list1 = [...stories, ...stories, ...stories]
  let posts2 = []
  if (apiDetails.apiStatus === apiStatusConstants.success) {
    const stories2 = stories.slice().reverse()
    posts2 = [...posts, ...stories2] // here stories used in posts for presenting  purpose (because in database only 3 posts are available)
  }
  //   const list2 = [...posts, ...posts, ...posts, ...posts]
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderUserBio = () => (
    <>
      <p className="profile-user-id">{userId}</p>
      <p className="profile-bio">{userBio}</p>
    </>
  )

  const renderposts = () => (
    <ul className="user-details-posts-list">
      {posts.map(each => (
        <li className="user-details-post-item">
          <img
            src={each.image}
            alt="my post"
            className="user-details-post-img"
          />
        </li>
      ))}
    </ul>
  )

  const renderNoposts = () => (
    <div className="no-posts-view-card">
      <div className="camera-icon-card">
        <BiCamera className="no-posts-camera-icon" />
      </div>
      <p className="no-posts-Text">No Posts Yet</p>
    </div>
  )

  const renderSuccessView = () => (
    <div className="user-details-bg-card">
      <div className="user-details-width-card">
        <div className="user-details-profile-card">
          <p className="user-frofile-name user-frofile-name-small">
            {userName}
          </p>
          <div className="user-profile-pic-Card">
            <img
              src={profilePic}
              alt="user profile"
              className="user-profile-pic"
            />
            <div className="bio-counts-card">
              <p className="user-frofile-name user-frofile-name-lg">
                {userName}
              </p>
              <div className="counts-card">
                <div className="count-card">
                  <p className="user-profile-count">{postsCount}</p>
                  <p className="user-profile-count-name">posts</p>
                </div>
                <div className="count-card">
                  <p className="user-profile-count">{followersCount}</p>
                  <p className="user-profile-count-name">followers</p>
                </div>
                <div className="count-card">
                  <p className="user-profile-count">{followingCount}</p>
                  <p className="user-profile-count-name">following</p>
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
                  alt="user profile"
                  className="storie-img"
                />
              </li>
            ))}
          </ul>
        ) : null}
        <hr className="user-details-hr" />
        <div className="user-posts-heading-card">
          <BsGrid3X3 className="posts-icon" />
          <h1 className="user-posts-heading">Posts</h1>
        </div>
        {posts.length > 0 ? renderposts() : renderNoposts()}
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="user-details-failure-view">
      <img
        src="https://res.cloudinary.com/dcbdcornz/image/upload/v1694151297/instaShare-urls/Group_7522_swimg_tbfbik.png"
        alt="failure view"
        className="user-details-failureview-img"
      />

      <p className="user-details-failureview-text">
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
