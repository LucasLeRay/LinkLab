import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Landing from './pages/Landing'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Board from './pages/Board'
import Context from './Context'
import apolloHttpLink from './helpers/apolloHttpLink'
import Toast from './Components/Toast'

const client = new ApolloClient({
  link: apolloHttpLink,
  cache: new InMemoryCache(),
})

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

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
    <ApolloProvider client={client}>
      <Context.Provider
        value={{ toast, setToast, user, handleLogin, handleLogout }}
      >
        <Router>
          <Switch>
            {user && <Route path="/" exact component={Home} />}
            {!user && <Route path="/" exact component={Landing} />}
            {!user && <Route path="/register" exact component={Register} />}
            {!user && <Route path="/login" exact component={Login} />}
            <Route path="/:userId/:tag" exact component={Board} />
            <Redirect to="/" />
          </Switch>
        </Router>
        {toast && <Toast />}
      </Context.Provider>
    </ApolloProvider>
  )
}

export default App
