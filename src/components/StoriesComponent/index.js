import React, {useState, useEffect} from 'react'
import {v4} from 'uuid'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import HomeFailureView from '../HomeFailureView'

import InstaShareContext from '../../context/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const StoriesComponent = () => {
  const {isDarkTheme, changeStoriesList} = React.useContext(InstaShareContext)

  const [storiesApi, setStoriesApi] = useState({
    storiesApiStatus: apiStatusConstants.initial,
    storiesData: [],
  })

  const getprofilePic = async id => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data, 'uid')
    return data.user_details.profile_pic
  }

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

    if (response.ok) {
      const formattedData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
        id: v4(),
      }))
      const newlist = await Promise.all(
        formattedData.map(async each => {
          const profilePic = await getprofilePic(each.userId)
          const item = {...each, profilePic}
          return item
        }),
      )

      setStoriesApi({
        storiesApiStatus: apiStatusConstants.success,
        storiesData: formattedData,
      })
      changeStoriesList(newlist)
      //   console.log(response, formattedData)
    } else {
      setStoriesApi({storiesApiStatus: apiStatusConstants.failure})
    }
  }

  useEffect(() => {
    getStoriesData()
  }, [])

  const retryFunction = () => {
    getStoriesData()
  }

  const themeClass = isDarkTheme ? 'stories-dark-theme' : ''
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    className: themeClass,

    slide: 'ul',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }
  const renderStories = () => (
    <ul className="stories-slides-container">
      <Slider {...settings}>
        {storiesApi.storiesData.map(each => {
          const {storyUrl, userId, userName, id} = each
          const printName = userName.slice(0, 9)

          const name = userName.length > 6 ? `${printName}...` : userName
          return (
            <li className="slick-item" key={userId}>
              <Link to={`stories/${userId}/${id}`} className="story-img-card">
                <img src={storyUrl} alt="user story" className="story-img" />
                <p className={`story-user-name ${textColor}`}>{name}</p>
              </Link>
            </li>
          )
        })}
      </Slider>
    </ul>
  )

  const renderLoader = () => (
    <div className="stories-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="stories-Failureview-card">
      <HomeFailureView retryFunction={retryFunction} />
    </div>
  )

  const renderStoriesView = () => {
    switch (storiesApi.storiesApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderStories()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return renderStoriesView()
}
export default StoriesComponent
