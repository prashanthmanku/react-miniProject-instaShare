import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {GrMenu} from 'react-icons/gr'
import {FaSearch} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'
import InstaShareContext from '../../context/index'
import './index.css'

const Header = () => {
  const contextData = React.useContext(InstaShareContext)
  const {
    searchInput,
    isMenuOpened,
    isMobileSearchBarOpened,
    changeSearchInput,
    changeIsMenuOpened,
    changeIsMobileSearchBarOpened,
  } = contextData

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
    changeSearchInput(searchText)
  }

  const onKeyDownEnter = e => {
    // console.log(e.key)
    if (e.key === 'Enter') {
      changeSearchInput(searchText)
    }
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
      <button type="button" className="search-btn" onClick={onClickSearchBtn}>
        <FaSearch className="search-icon" />
      </button>
    </div>
  )

  const renderHomeLink = () => (
    <Link to="/" className="nav-link">
      Home
    </Link>
  )

  const renderProfileLink = () => (
    <Link to="/my-profile" className="nav-link">
      Profile
    </Link>
  )

  const renderLogoutBtn = () => (
    <button type="button" className="logout-btn">
      Logout
    </button>
  )

  const renderMobileNavItems = () => (
    <ul className="mobile-nav-items-card">
      <li className="nav-item">{renderHomeLink()}</li>
      <li className="nav-item ">
        <button
          type="button"
          className="mobile-menu-search-btn"
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
          <IoMdCloseCircle className="mobile-menu-items-close-icon" />
        </button>
      </li>
    </ul>
  )
  console.log(isMenuOpened, isMobileSearchBarOpened)
  const header2Height =
    isMenuOpened || isMobileSearchBarOpened ? 'header2-Height' : ''

  return (
    <nav className="header-container">
      <div className="header-width-card">
        <div className="header-1">
          <div className="header-logo-card">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcbdcornz/image/upload/v1690720913/instaShare-urls/Standard_Collection_8_instashare-logo_imgvl5.svg"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <h1 className="header-logo-text">Insta Share</h1>
          </div>
          <button
            type="button"
            className="mobile-hambarger-btn"
            onClick={onClickMenuIcon}
          >
            <GrMenu className="menu-icon" />
          </button>
          <ul className="desktop-nav-items-card">
            <li className="nav-item">{renderSearchBar()}</li>
            <li className="nav-item">{renderHomeLink()}</li>
            <li className="nav-item">{renderProfileLink()}</li>
            <li className="nav-item">{renderLogoutBtn()}</li>
          </ul>
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
export default Header
