import { useReducer, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { PulseLoader } from 'react-spinners'

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

const RegisterSwitch = styled.div`
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

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
`

const reducer = (state, { name, value }) => ({ ...state, [name]: value })

function Register() {
  const [fields, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  })
  const [isLoading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState(null)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      setNewUser(
        await Auth.signUp({
          username: fields.email,
          password: fields.password,
        }),
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmationSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode)
      await Auth.signIn(fields.email, fields.password)
      history.push('/')
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  function validForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    )
  }

  function validConfirmation() {
    return fields.confirmationCode.length > 0
  }

  return newUser ? (
    <Form onSubmit={handleConfirmationSubmit}>
      <Text>You received a confirmation code by email.</Text>
      <InputWrapper>
        <Input
          label="Confirmation Code"
          value={fields.confirmationCode}
          onChange={(e) => {
            dispatch({
              name: 'confirmationCode',
              value: e.target.value,
            })
          }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button center primary disable={!validConfirmation()} type="submit">
          {isLoading ? (
            <PulseLoader size={10} margin={10} color="#ffffff" />
          ) : (
            'Validate'
          )}
        </Button>
      </ButtonWrapper>
    </Form>
  ) : (
    <Form onSubmit={handleSubmit}>
      <Title>Welcome 🎉</Title>
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
        <Input
          label="Confirm Password"
          type="password"
          value={fields.confirmPassword}
          onChange={(e) => {
            dispatch({
              name: 'confirmPassword',
              value: e.target.value,
            })
          }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button center primary disabled={!validForm()} type="submit">
          {isLoading ? (
            <PulseLoader size={10} margin={10} color="#ffffff" />
          ) : (
            'Register'
          )}
        </Button>
      </ButtonWrapper>
      <RegisterSwitch>
        <span>Already have an account ?</span>
        <Link to="/login">Login</Link>
      </RegisterSwitch>
    </Form>
  )
}

export default Register
