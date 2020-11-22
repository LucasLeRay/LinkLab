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

function Register() {
  return (
    <Container>
      <Title>Welcome 🎉</Title>
      <InputWrapper>
        <Input label="Email Address" type="email" />
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />
      </InputWrapper>
      <ButtonWrapper>
        <Button center primary>
          Register
        </Button>
      </ButtonWrapper>
      <RegisterSwitch>
        <span>Already have an account ?</span>
        <Link to="/login">Login</Link>
      </RegisterSwitch>
    </Container>
  )
}

export default Register
