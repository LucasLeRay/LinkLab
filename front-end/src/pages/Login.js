import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from '../Components/Button'
import Input from '../Components/Input'

const Container = styled.div`
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
  font-size: 18px;

  a {
    font-weight: 700;
    color: var(--color-primary);
    margin-left: 8px;
    text-decoration: none;
  }
`

function Login() {
  return (
    <Container>
      <Title>Welcome back 🎉</Title>
      <InputWrapper>
        <Input label="Email Address" type="email" />
        <Input label="Password" type="password" />
      </InputWrapper>
      <ButtonWrapper>
        <Button center primary>
          Login
        </Button>
      </ButtonWrapper>
      <LoginSwitch>
        <span>Don&apos;t have an account ?</span>
        <Link to="/register">Create Account</Link>
      </LoginSwitch>
    </Container>
  )
}

export default Login
