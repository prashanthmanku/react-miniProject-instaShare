import React from 'react'
import Header from '../Header'
import UserDetails from '../UserDetails'
import './index.css'

import InstaShareContext from '../../context/index'

const UserProfileRoute = () => {
  const {isMenuOpened, isMobileSearchBarOpened} = React.useContext(
    InstaShareContext,
  )
  const marginTop =
    isMenuOpened || isMobileSearchBarOpened
      ? 'userDetails-route-bg-margin-1'
      : 'userDetails-route-bg-margin-2'
  return (
    <div>
      <Header />
      <div className={`userDetails-route-bg ${marginTop}`}>
        <UserDetails />
      </div>
    </div>
  )
}

export default UserProfileRoute
