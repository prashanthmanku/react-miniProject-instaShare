import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'

import './index.css'

const PostItem = props => {
  const {postDetails} = props

  const {
    comments,
    postCaption,
    postId,
    postImgUrl,
    profilePic,
    userId,
    userName,
  } = postDetails

  return (
    <li className="post-item-card" key={postId}>
      <div className="post-item-userName-card">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-item-profile-img"
        />
        <p className="post-item-userName">{userName}</p>
      </div>
      <img src={postImgUrl} alt="post" className="post-item-post-img" />
    </li>
  )
}
export default PostItem
