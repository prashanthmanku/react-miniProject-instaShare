import React from 'react'
import './index.css'

import InstaShareContext from '../../context/index'

const HomeFailureView = props => {
  const {isDarkTheme} = React.useContext(InstaShareContext)
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'

  const {retryFunction} = props
  const onClickRetry = () => {
    retryFunction()
  }
  return (
    <>
      {/* <BsExclamationTriangleFill className="home-failure-icon" /> */}
      <img
        src="https://res.cloudinary.com/dcbdcornz/image/upload/v1694156803/instaShare-urls/alert-triangle_hfimg_sigsqh.png"
        alt="failure view"
        className="home-failure-icon"
      />
      <p className={`home-failure-text ${textColor}`}>
        Something went wrong. Please try again
      </p>
      <button
        className="home-failure-tryAgain-btn"
        type="button"
        onClick={onClickRetry}
      >
        Try again
      </button>
    </>
  )
}

export default HomeFailureView
