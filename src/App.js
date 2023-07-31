import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import UserProfileRoute from './components/UserProfileRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFoundRoute from './components/NotFoundRoute'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/users/:id" component={UserProfileRoute} />
    <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
    <Route exact path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
