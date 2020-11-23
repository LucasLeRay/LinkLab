import { useContext, useReducer, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { PulseLoader } from 'react-spinners'

import Context from '../Context'
import Button from '../Components/Button'
import Input from '../Components/Input'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 64px;
`

const InputWrapper = styled.div`
  width: 340px;
`

const ButtonWrapper = styled.div`
  margin-top: 24px;
  width: 340px;
`

const LoginSwitch = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  font-size: 16px;

  a {
    font-weight: 700;
    color: var(--color-primary);
    margin-left: 8px;
    text-decoration: none;
  }
`

const reducer = (state, { name, value }) => ({ ...state, [name]: value })

function Login() {
  const { handleLogin } = useContext(Context)

  const [fields, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
  })
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await Auth.signIn(fields.email, fields.password)
      await handleLogin()
      history.push('/')
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  function validForm() {
    return fields.email.length > 0 && fields.password.length > 0
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Welcome back 🎉</Title>
      <InputWrapper>
        <Input
          label="Email Address"
          type="email"
          value={fields.email}
          onChange={(e) => {
            dispatch({
              name: 'email',
              value: e.target.value,
            })
          }}
        />
        <Input
          label="Password"
          type="password"
          value={fields.password}
          onChange={(e) => {
            dispatch({
              name: 'password',
              value: e.target.value,
            })
          }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button center primary disabled={!validForm()}>
          {isLoading ? (
            <PulseLoader size={10} margin={10} color="#ffffff" />
          ) : (
            'Login'
          )}
        </Button>
      </ButtonWrapper>
      <LoginSwitch>
        <span>Don&apos;t have an account ?</span>
        <Link to="/register">Create Account</Link>
      </LoginSwitch>
    </Form>
  )
}

export default Login
