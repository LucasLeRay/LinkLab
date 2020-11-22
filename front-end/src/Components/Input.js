import styled from 'styled-components'
import { shape, string } from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  height: 32px;
  width: 100%;
  max-width: ${({ icon }) => (icon ? '266' : '258')}px;
  margin: 8px;
  padding: 8px 16px 8px ${({ icon }) => (icon ? '8' : '16')}px;
  border-radius: 10px;

  cursor: text;
  text-align: left;

  background-color: var(--color-grey-3);

  &:hover {
    background-color: ${({ primary }) => !primary && 'var(--color-grey-3)'};
  }
`

const StyledInput = styled.input`
  width: 100%;
  background-color: var(--color-grey-3);
  border: none;
  color: var(--color-grey-1);
  font-size: 18px;
  font-weight: 600;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--color-grey-2);
  }
`

const IconWrapper = styled.div`
  display: flex;
  margin-right: 8px;

  svg {
    color: var(--color-grey-2);
    width: 32px;
    height: 32px;
  }
`

const Label = styled.label`
  margin-left: 16px;
  font-size: 18px;
  color: var(--color-grey-1);
  font-weight: 700;
`

function Input({ icon, label, ...props }) {
  return (
    <Container>
      {label && <Label htmlFor={label}>{label}</Label>}
      <Wrapper icon={!!icon}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput name={label || undefined} {...props} />
      </Wrapper>
    </Container>
  )
}

Input.propTypes = {
  icon: shape({}),
  label: string,
}

Input.defaultProps = {
  icon: null,
  label: '',
}

export default Input
