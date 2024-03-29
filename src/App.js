import {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import UserProfileRoute from './components/UserProfileRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFoundRoute from './components/NotFoundRoute'
import StoriesRoute from './components/StoriesRoute'

import ProtectedRoute from './components/ProtectedRoute'
import InstaShareContext from './context/index'

import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isMobileSearchBarOpened, setIsMobileSearchBarOpened] = useState(false)
  const [searchCount, setSearchCount] = useState(0)
  const [SearchedList, setSearchedList] = useState([])
  const [isDarkTheme, setTheme] = useState(false)
  const [count, setCount] = useState(0)
  const [storiesList, setStoriesList] = useState([])

  const changeTheme = () => {
    setTheme(prev => !prev)
  }

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

  const changeSearchCount = value => {
    setSearchCount(value)
  }

  const changeSearchedList = value => {
    setSearchedList(value)
  }

  const changeCount = () => {
    setCount(prev => prev + 1)
  }

  const changeStoriesList = list => {
    setStoriesList(list)
  }

  const theme = isDarkTheme ? 'dark-theme' : 'light-theme'

  return (
    <InstaShareContext.Provider
      value={{
        isDarkTheme,
        searchInput,
        isMenuOpened,
        isMobileSearchBarOpened,
        searchCount,
        SearchedList,
        count,
        changeSearchInput,
        changeIsMenuOpened,
        changeIsMobileSearchBarOpened,
        changeSearchCount,
        changeSearchedList,
        changeTheme,
        changeCount,
        storiesList,
        changeStoriesList,
      }}
    >
      <div className={theme}>
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} key={count} />
          <ProtectedRoute
            exact
            path="/users/:id"
            component={UserProfileRoute}
          />
          <ProtectedRoute
            exact
            path="/my-profile"
            component={MyProfileRoute}
            key={count}
          />
          <ProtectedRoute
            exact
            path="/stories/:userId/:storyId"
            component={StoriesRoute}
          />
          <Route exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </InstaShareContext.Provider>
  )
}

export default App
