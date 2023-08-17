import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {formatDistanceToNow} from 'date-fns'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'

import {FaRegComment} from 'react-icons/fa'

import './index.css'

const PostItem = props => {
  const [isLiked, setIsliked] = useState(false)

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
    // console.log(data)
  }

  const onToggleLike = () => {
    setIsliked(prevState => !prevState)
    postLikeApi()
  }

  return (
    <li className="post-item-card" key={postId}>
      <div className="post-item-userName-card">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-item-profile-img"
        />
        <Link to={`/users/${userId}`} className="post-item-user-nav-link">
          <p className="post-item-userName">{userName}</p>
        </Link>
      </div>
      <img src={postImgUrl} alt="post" className="post-item-post-img" />
      <div className="post-item-content">
        <div className="post-item-icons-card">
          <button
            type="button"
            className="post-item-icon-button"
            data-testid={isLiked ? 'likeIcon' : 'unLikeIcon'}
            onClick={onToggleLike}
          >
            {isLiked ? (
              <FcLike className="like-icon" />
            ) : (
              <BsHeart className="unlike-icon" />
            )}
          </button>
          <button type="button" className="post-item-icon-button">
            <FaRegComment className="comment-icon" />
          </button>
          <button type="button" className="post-item-icon-button">
            <BiShareAlt className="share-icon" />
          </button>
        </div>
        <p className="post-likes-count">
          {isLiked ? likesCount + 1 : likesCount} Likes
        </p>
        <p className="post-caption">{postCaption}</p>
        <ul className="comments-list">
          {comments.map(each => (
            <li key={each.userId} className="post-comment">
              <span className="commented-userName">{each.userName}</span>
              {each.comment}
            </li>
          ))}
        </ul>
        <p className="post-posted-time">{createdAt}</p>
      </div>
    </li>
  )
}
export default PostItem
