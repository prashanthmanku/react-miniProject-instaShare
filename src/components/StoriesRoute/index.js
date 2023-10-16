import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {useHistory, Link} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'

import InstaShareContext from '../../context/index'
import './index.css'

const StoriesRoute = props => {
  const {storiesList} = React.useContext(InstaShareContext)
  console.log(storiesList)
  const {match} = props
  const {params} = match
  const {storyId, userId} = params
  const activeIndex = storiesList.findIndex(each => {
    if (each.id === storyId) {
      return true
    }
    return false
  })
  console.log(activeIndex)
  let textColor
  let data

  const [StoryId, setStoryId] = useState(storiesList[activeIndex].id)
  const [UserId, setUserId] = useState(storiesList[activeIndex].userId)
  const [userProfilePic, setUserProfilePic] = useState('')

  const history = useHistory()
  useEffect(() => {
    history.replace(`/stories/${UserId}/${StoryId}`)
  }, [StoryId, UserId, history])
  console.log(userProfilePic)

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    initialSlide: activeIndex,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 't',
    afterChange: index => {
      console.log(index, 'llllllllllllllllll', activeIndex)
      setStoryId(storiesList[index].id)
      setUserId(storiesList[index].userId)

      if (index === storiesList.length - 1) {
        setTimeout(() => {
          history.push('/')
        }, 4000)
      }
    },
  }

  return (
    <div className="story-route-bg">
      <div className="story-header-card">
        <Link to="/" className="stories-logo-card">
          <img
            src="https://res.cloudinary.com/dcbdcornz/image/upload/v1690720913/instaShare-urls/Standard_Collection_8_instashare-logo_imgvl5.svg"
            alt="website logo"
            className="stories-website-logo"
          />

          <h1 className={`stories-logo-text ${textColor} `}>Insta Share</h1>
        </Link>
        <Link to="/">
          <AiOutlineClose className="story-close-icon" />
        </Link>
      </div>
      <Slider {...settings}>
        {storiesList.map(each => (
          <li className="story-route-item" key={each.id}>
            <div className="post-item-userName-card">
              <img
                src={each.profilePic}
                alt="post author profile"
                className="post-item-profile-img"
              />
              <Link
                to={`/users/${each.userId}`}
                className="post-item-user-nav-link"
              >
                <p className={`post-item-userName ${textColor}`}>
                  {each.userId}
                </p>
              </Link>
            </div>
            <img
              src={each.storyUrl}
              alt="story img"
              className="story-route-img"
            />
          </li>
        ))}
      </Slider>
    </div>
  )
}
export default StoriesRoute
