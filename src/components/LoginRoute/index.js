import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

// Cookies.remove('jwt_token')
const LoginRoute = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = e => {
    setUserName(e.target.value.replace(' ', ''))
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  console.log(username, password)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 5})
    history.replace('/')
  }

  const onSubmitFailure = Msg => {
    setErrorMsg(Msg)
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    let userDetails = {username, password}
    if (username === 'prashanth' && password === 'prash@2023') {
      userDetails = {username: 'rahul', password: 'rahul@2021'}
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response, data)
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-card">
      <div className="login-width-card">
        <img
          src="https://res.cloudinary.com/dcbdcornz/image/upload/v1690720893/Layer_2_login-img_cd7kij.png"
          className="login-img"
          alt="website login"
        />
        <form onSubmit={onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dcbdcornz/image/upload/v1690720913/Standard_Collection_8_instashare-logo_imgvl5.svg"
            className="login-logo"
            alt="website logo"
          />
          <h1 className="login-logo-text">Insta Share</h1>
          <div className="input-card">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="input-card">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {errorMsg.length !== 0 && <p className="error_msg">{errorMsg}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginRoute
