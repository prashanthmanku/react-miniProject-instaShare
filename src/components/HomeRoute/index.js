import React from 'react'
import {FiSearch} from 'react-icons/fi'
import {AiOutlinePlus} from 'react-icons/ai'
import {FaPlus} from 'react-icons/fa'

import Header from '../Header'
import './index.css'
import StoriesComponent from '../StoriesComponent'
import PostsComponent from '../PostsComponent'
import InstaShareContext from '../../context/index'

const HomeRoute = () => {
  const {isMobileSearchBarOpened, searchCount} = React.useContext(
    InstaShareContext,
  )
  console.log(isMobileSearchBarOpened)

  const storiesMobileClassName =
    isMobileSearchBarOpened || searchCount > 0
      ? 'stories-mobile-view-hidden'
      : ''
  const storiesLgClassName = searchCount > 0 ? 'stories-lg-view-hidden' : ''

  const postsMobileViewClassName =
    isMobileSearchBarOpened && searchCount === 0
      ? 'posts-mobile-view-hidden'
      : ''

  const renderStories = () => (
    <div
      className={`stories-home-card-bg ${storiesMobileClassName} ${storiesLgClassName}`}
    >
      <StoriesComponent />
    </div>
  )

  const renderPosts = () => (
    <div className={`home-bg-posts ${postsMobileViewClassName}`}>
      <PostsComponent />
    </div>
  )

  const initialSearchCardClassName =
    (isMobileSearchBarOpened && searchCount !== 0) || !isMobileSearchBarOpened
      ? 'initial-search-card-hidden'
      : ''

  const renderInitialMobileSearchView = () => (
    <div className={`initial-search-card ${initialSearchCardClassName}`}>
      <div className="initial-search-icons-card">
        <FiSearch className="initial-search-icon" />
        <div className="initial-search-plus-card">
          <FaPlus className="initial-search-plus-icon-1" />
          <FaPlus className="initial-search-plus-icon-2" />
        </div>
      </div>

      <p className="initial-search-text">Search Results will be appear here</p>
    </div>
  )

  const renderSearchHeading = () =>
    searchCount > 0 && (
      <div className="search-results-heading-card">
        <div className="search-results-width-card">
          <h1 className="search-results-heading">Search Results</h1>
        </div>
      </div>
    )

  return (
    <>
      <Header />
      <div className="home-bg-card">
        {renderStories()}
        {renderSearchHeading()}
        {renderPosts()}
        {renderInitialMobileSearchView()}
      </div>
    </>
  )
}

export default HomeRoute
