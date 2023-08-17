import {BsExclamationTriangleFill} from 'react-icons/bs'
import './index.css'

const HomeFailureView = props => {
  const {retryFunction} = props
  const onClickRetry = () => {
    retryFunction()
  }
  return (
    <>
      <BsExclamationTriangleFill className="home-failure-icon" />
      <p className="home-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        className="home-failure-tryAgain-btn"
        type="button"
        onClick={onClickRetry}
      >
        Try again
      </button>
    </>
  )
}

export default HomeFailureView
