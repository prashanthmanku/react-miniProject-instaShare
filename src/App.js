import {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import UserProfileRoute from './components/UserProfileRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFoundRoute from './components/NotFoundRoute'

import ProtectedRoute from './components/ProtectedRoute'
import InstaShareContext from './context/index'

import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isMobileSearchBarOpened, setIsMobileSearchBarOpened] = useState(false)
  const [searchCount, setSearchCount] = useState(0)
  const [SearchedList, setSearchedList] = useState([])

  const changeSearchInput = value => {
    setSearchInput(value)
  }

  const changeIsMenuOpened = value => {
    setIsMenuOpened(value)
  }

  const changeIsMobileSearchBarOpened = value => {
    setIsMobileSearchBarOpened(value)
  }
  console.log(searchInput)

  const changeSearchCount = () => {
    setSearchCount(prev => prev + 1)
  }

  const changeSearchedList = value => {
    setSearchedList(value)
  }

  return (
    <InstaShareContext.Provider
      value={{
        searchInput,
        isMenuOpened,
        isMobileSearchBarOpened,
        searchCount,
        SearchedList,
        changeSearchInput,
        changeIsMenuOpened,
        changeIsMobileSearchBarOpened,
        changeSearchCount,
        changeSearchedList,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/users/:id" component={UserProfileRoute} />
        <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
        <Route exact path="/not-found" component={NotFoundRoute} />
        <Redirect to="/not-found" />
      </Switch>
    </InstaShareContext.Provider>
  )
}

export default App
