import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
