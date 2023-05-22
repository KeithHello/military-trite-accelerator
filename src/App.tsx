import { useRoutes } from 'react-router-dom'
import routes from './router'

const Router = () => {
  const router = useRoutes(routes)

  return router
}

const App = () => {

  return (
    <div>
      <Router />
    </div>
  )
}

export default App
