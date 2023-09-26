import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {formatDistanceToNow} from 'date-fns'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'

import {FaRegComment} from 'react-icons/fa'

import InstaShareContext from '../../context/index'

import './index.css'

const PostItem = props => {
  const [isLiked, setIsliked] = useState(false)

  const {isDarkTheme} = React.useContext(InstaShareContext)

  const {postDetails} = props

  const {
    comments,
    postCaption,
    postId,
    postImgUrl,
    profilePic,
    userId,
    likesCount,
    userName,
    createdAt,
  } = postDetails

  const postLikeApi = async () => {
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const requestBody = {
      like_status: !isLiked,
    }
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  const onToggleLike = () => {
    setIsliked(prevState => !prevState)
    postLikeApi()
  }

  const theme = isDarkTheme ? 'post-item-dark-theme' : 'post-item-light-theme'
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'
  const postBorder = isDarkTheme
    ? 'dark-post-item-border'
    : 'light-post-item-border'

  return (
    <li className={`post-item-card ${theme} ${postBorder}`} key={postId}>
      <div className="post-item-userName-card">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-item-profile-img"
        />
        <Link to={`/users/${userId}`} className="post-item-user-nav-link">
          <p className={`post-item-userName ${textColor}`}>{userName}</p>
        </Link>
      </div>
      <img src={postImgUrl} alt="post" className="post-item-post-img" />
      <div className="post-item-content">
        <div className="post-item-icons-card">
          <button
            type="button"
            className={`post-item-icon-button ${textColor}`}
            data-testid={!isLiked ? 'likeIcon' : 'unLikeIcon'}
            onClick={onToggleLike}
          >
            {isLiked ? (
              <FcLike className="post-item-icon" />
            ) : (
              <BsHeart className="post-item-icon" />
            )}
          </button>
          <button
            type="button"
            className={`post-item-icon-button ${textColor}`}
          >
            <FaRegComment className="post-item-icon" />
          </button>
          <button
            type="button"
            className={`post-item-icon-button ${textColor}`}
          >
            <BiShareAlt className="post-item-icon" />
          </button>
        </div>
        <p className={`post-likes-count  ${textColor}`}>
          {isLiked ? likesCount + 1 : likesCount} Likes
        </p>
        <p className={`post-caption  ${textColor}`}>{postCaption}</p>
        <ul className="comments-list">
          {comments.map(each => (
            <li key={each.userId} className="post-comment">
              <Link
                to={`/users/${each.userId}`}
                className="post-item-user-nav-link"
              >
                <span className={`commented-userName ${textColor}`}>
                  {each.userName}
                </span>
              </Link>
              <p className={`post-comment-text ${textColor}`}>{each.comment}</p>
            </li>
          ))}
        </ul>
        <p className="post-posted-time">{createdAt}</p>
      </div>
    </li>
  )
}
export default PostItem
