import {useState, useEffect} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRSS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const StoriesComponent = () => {
  const [storiesApi, setStoriesApi] = useState({
    storiesApiStatus: apiStatusConstants.initial,
    storiesData: [],
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
      console.log(response, formattedData)
    } else {
      setStoriesApi({storiesApiStatus: apiStatusConstants.failure})
    }
  }

  useEffect(() => {
    getStoriesData()
  }, [])

  //   const settings = {
  //     // infinite: false,
  //     initialSlide: 0,
  //     speed: 500,
  //     slidesToShow: 5,
  //     slidesToScroll: 1,
  //     arrows: true,
  //     swipe: true,
  //     swipeToSlide: true,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 4,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 500,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 230,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   }
  const settings = {
    dots: false,
    // infinite: false,
    slidesToShow: 8,
    slidesToScroll: 1,
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
  const rederStories = () => (
    <div className="stories-slides-container">
      <Slider {...settings}>
        {storiesApi.storiesData.map(each => {
          const {storyUrl, userId, userName} = each

          const name = userName.length > 6 ? userName.slice(0, 9) : userName
          return (
            <div className="slick-item" key={userId}>
              <div className="story-img-card">
                <img src={storyUrl} alt="story" className="story-img" />
                <p className="story-user-name">{name}</p>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )

  return rederStories()
}
export default StoriesComponent
