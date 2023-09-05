import Header from '../Header'
import './index.css'

const NotFoundRoute = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="not-found-route-bg">
      <div className="not-found-route-width-card">
        <img
          src="https://res.cloudinary.com/dcbdcornz/image/upload/v1693887243/instaShare-urls/erroring_2_1_xmloks.png"
          className="not-found-route-img"
          alt="page not found"
        />
        <h1 className="not-found-route-heading">Page Not Found</h1>
        <p className="not-found-route-description">
          we are sorry, the page you requested could not be found.
        </p>
        <p className="not-found-route-description">
          Please go back to the homepage.
        </p>
        <button
          className="not-found-route-button"
          type="button"
          onClick={onClickHomePage}
        >
          Home Page
        </button>
      </div>
    </div>
  )
}
export default NotFoundRoute
