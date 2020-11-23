import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Auth } from 'aws-amplify'

import Landing from './pages/Landing'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Context from './Context'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function handleLogout() {
    await Auth.signOut()
    setUser(null)
  }

  async function handleLogin() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser()
      setUser(attributes)
    } catch (err) {
      setUser(null)
    }
  }

  useEffect(() => {
    async function onLoad() {
      await handleLogin()
      setLoading(false)
    }
    onLoad()
  }, [])

  return loading ? null : (
    <Context.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
      }}
    >
      <Router>
        <Switch>
          {user && <Route path="/" exact component={Home} />}
          {!user && <Route path="/" exact component={Landing} />}
          {!user && <Route path="/register" exact component={Register} />}
          {!user && <Route path="/login" exact component={Login} />}
          <Redirect to="/" />
        </Switch>
      </Router>
    </Context.Provider>
  )
}

export default App
