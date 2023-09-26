import React, {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiMenu, FiSun} from 'react-icons/fi'
import {FaSearch, FaMoon} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'
import InstaShareContext from '../../context/index'
import './index.css'

const Header = props => {
  const contextData = React.useContext(InstaShareContext)
  const {
    isMenuOpened,
    isMobileSearchBarOpened,
    changeSearchInput,
    changeIsMenuOpened,
    changeIsMobileSearchBarOpened,
    changeSearchCount,
    searchCount,
    isDarkTheme,
    changeTheme,
    changeCount,
  } = contextData

  const theme = isDarkTheme ? 'header-dark-theme' : 'header-light-theme'
  const textColor = isDarkTheme ? 'dark-color' : 'light-color'

  const [searchText, setSearchText] = useState('')

  const onClickMenuIcon = () => {
    changeIsMenuOpened(!isMenuOpened)
    changeIsMobileSearchBarOpened(false)
  }

  const onClickCloseMenuItens = () => {
    changeIsMenuOpened(false)
  }

  const onClickMobileSearchBtn = () => {
    changeIsMenuOpened(false)
    changeIsMobileSearchBarOpened(true)
  }

  const onChangeSearchText = e => {
    setSearchText(e.target.value)
  }

  const onClickSearchBtn = () => {
    if (searchText.length > 0) {
      changeSearchInput(searchText)
      changeIsMobileSearchBarOpened(true)
      changeSearchCount(searchCount + 1)
    }
  }

  const onKeyDownEnter = e => {
    // console.log(e.key)
    if (e.key === 'Enter') {
      if (searchText.length > 0) {
        changeSearchInput(searchText)
        changeIsMobileSearchBarOpened(true)
        changeSearchCount(searchCount + 1)
      }
    }
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickThemBtn = () => {
    changeTheme()
  }

  const onClickLogo = () => {
    changeCount()
    changeIsMobileSearchBarOpened(false)
    // changeIsMenuOpened(false)
    changeSearchInput('')
    changeSearchCount(0)
  }

  const onClickProfile = () => {
    changeCount()
  }

  const renderSearchBar = () => (
    <div className="search-card">
      <input
        type="search"
        placeholder="Search Caption"
        className="search-input"
        value={searchText}
        onChange={onChangeSearchText}
        onKeyDown={onKeyDownEnter}
      />
      <button
        type="button"
        className="search-btn"
        onClick={onClickSearchBtn}
        data-testid="searchIcon"
      >
        <FaSearch className="search-icon" />
      </button>
    </div>
  )

  const renderHomeLink = () => (
    <Link to="/" className={`nav-link ${textColor}`} onClick={onClickLogo}>
      Home
    </Link>
  )

  const renderProfileLink = () => (
    <Link
      to="/my-profile"
      className={`nav-link ${textColor}`}
      onClick={onClickProfile}
    >
      Profile
    </Link>
  )

  const renderLogoutBtn = () => (
    <button type="button" className="logout-btn" onClick={onClickLogout}>
      Logout
    </button>
  )

  const renderMobileNavItems = () => (
    <ul className="mobile-nav-items-card">
      <li className="nav-item">{renderHomeLink()}</li>
      <li className="nav-item ">
        <button
          type="button"
          className={`mobile-menu-search-btn ${textColor}`}
          onClick={onClickMobileSearchBtn}
        >
          Search
        </button>
      </li>
      <li className="nav-item">{renderProfileLink()}</li>
      <li className="nav-item">{renderLogoutBtn()}</li>
      <li className="nav-item">
        <button
          type="button"
          className="mobile-menu-items-close-btn"
          onClick={onClickCloseMenuItens}
        >
          <IoMdCloseCircle
            className={`mobile-menu-items-close-icon ${textColor}`}
          />
        </button>
      </li>
    </ul>
  )
  console.log(isMenuOpened, isMobileSearchBarOpened)
  const header2Height =
    isMenuOpened || isMobileSearchBarOpened ? 'header2-Height' : ''

  return (
    <nav className={`header-container ${theme}`}>
      <div className="header-width-card">
        <div className="header-1">
          <div className="header-logo-card">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcbdcornz/image/upload/v1690720913/instaShare-urls/Standard_Collection_8_instashare-logo_imgvl5.svg"
                alt="website logo"
                className="header-logo"
                onClick={onClickLogo}
              />
            </Link>
            <h1 className={`header-logo-text ${textColor} `}>Insta Share</h1>
          </div>
          <div className="nav-items-bg-card">
            <div>
              <button
                type="button"
                className="theme-btn"
                onClick={onClickThemBtn}
              >
                {isDarkTheme ? (
                  <FiSun className={`menu-icon ${textColor}`} />
                ) : (
                  <FaMoon className={`menu-icon ${textColor}`} />
                )}
              </button>
              <button
                type="button"
                className="mobile-hambarger-btn"
                onClick={onClickMenuIcon}
              >
                <FiMenu className={`menu-icon ${textColor}`} />
              </button>
            </div>
            <ul className="desktop-nav-items-card">
              <li className="nav-item">{renderSearchBar()}</li>
              <li className="nav-item">{renderHomeLink()}</li>
              <li className="nav-item">{renderProfileLink()}</li>
              <li className="nav-item">{renderLogoutBtn()}</li>
            </ul>
          </div>
        </div>

        <div className={`header-2 ${header2Height}`}>
          {isMenuOpened && renderMobileNavItems()}
          {isMobileSearchBarOpened && (
            <div className="mobile-search-bar">{renderSearchBar()}</div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
