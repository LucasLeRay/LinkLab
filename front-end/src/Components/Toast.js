import { useContext } from 'react'
import styled from 'styled-components'
import Context from '../Context'

const Container = styled.div`
  position: absolute;
  bottom: 24px;
  left: calc(50% - 160px);
  background-color: var(--color-grey-4);
  border-radius: 8px;
  height: 32px;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Toast() {
  const { toast, setToast } = useContext(Context)

  const timeout = setTimeout(() => {
    setToast(null)
    clearTimeout(timeout)
  }, 5000)

  return <Container onClick={() => setToast(null)}>{toast}</Container>
}

export default Toast
