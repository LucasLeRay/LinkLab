import fs from 'fs'
import { ApolloServer } from 'apollo-server-lambda'
import AWS from 'aws-sdk'

import resolvers from './resolvers'

const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf8')

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    const { headers } = event
    const authorizationHeader =
      headers.Authorization || headers.authorization || 'guest'

    let user = null
    if (authorizationHeader !== 'guest') {
      try {
        const { Username } = await cognito
          .getUser({ AccessToken: authorizationHeader.slice(7) })
          .promise()
        user = { Username }
      } catch (err) {
        console.error(err)
      }
    }
    return { user }
  },
  playground: {
    endpoint: '/dev/graphql',
  },
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
