import React from 'react'
import Header from '../Header'
import './index.css'
import StoriesComponent from '../StoriesComponent'
import PostsComponent from '../PostsComponent'
import InstaShareContext from '../../context/index'

const HomeRoute = () => {
  const {isMobileSearchBarOpened} = React.useContext(InstaShareContext)

  return (
    <>
      <Header />
      <div className="home-bg-card">
        <div className="stories-home-card-bg">
          <StoriesComponent />
        </div>

        <PostsComponent />
      </div>
    </>
  )
}

export default HomeRoute
