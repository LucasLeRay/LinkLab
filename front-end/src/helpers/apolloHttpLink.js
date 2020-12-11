import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Auth } from 'aws-amplify'

import config from '../config'

const httpLink = createHttpLink({
  uri: config.graphqlEndpoint,
})

const authLink = setContext(async (_, { headers }) => {
  let jwt
  try {
    const session = await Auth.currentSession()
    jwt = session.accessToken.jwtToken
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    jwt = null
  }

  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : '',
      'Access-Control-Allow-Origin': 'https://linklab.app',
    },
  }
})

export default authLink.concat(httpLink)
