import React from 'react'
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

  return (
    <>
      <Header />
      <div className="home-bg-card">
        <div
          className={`stories-home-card-bg ${storiesMobileClassName} ${storiesLgClassName}`}
        >
          <StoriesComponent />
        </div>

        <PostsComponent />
      </div>
    </>
  )
}

export default HomeRoute
