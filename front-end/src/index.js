import React from 'react'
import ReactDOM from 'react-dom'
import { Amplify } from 'aws-amplify'
import dotenv from 'dotenv'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

dotenv.config()

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_USER_POOL_ID,
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.AWS_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'graphql',
        endpoint: process.env.AWS_API_GATEWAY_URL,
        region: process.env.AWS_REGION,
      },
    ],
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
