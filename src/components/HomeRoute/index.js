import Header from '../Header'
import './index.css'
import StoriesComponent from '../StoriesComponent'
import PostsComponent from '../PostsComponent'

const HomeRoute = () => (
  <>
    <Header />
    <div className="home-bg-card">
      <StoriesComponent />
      <PostsComponent />
    </div>
  </>
)

export default HomeRoute
