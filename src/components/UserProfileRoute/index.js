import {useState, useEffect} from 'react'
import Header from '../Header'

const UserProfileRoute = () => {
  const getUserData = () => {
    console.log('x------')
  }

  useEffect(() => {
    getUserData()
  })
  return (
    <div>
      <Header />
      <p>User ProfileRoute</p>
    </div>
  )
}
export default UserProfileRoute
