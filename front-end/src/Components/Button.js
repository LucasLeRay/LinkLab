import styled from 'styled-components'
import { elementType, oneOfType, string, arrayOf, node, bool } from 'prop-types'

const StyledButton = styled.button`
  height: 48px;
  width: 100%;
  max-width: 288px;
  margin: 8px;
  padding: 8px 8px 8px ${({ icon }) => (icon ? '8' : '48')}px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
  border: none;
  outline: inherit;
  text-align: left;

  background-color: var(
    --color-${({ primary }) => (primary ? 'primary' : 'grey-4')}
  );
  color: var(--color-grey-1);

  &:hover {
    background-color: ${({ primary }) => !primary && 'var(--color-grey-3)'};
  }
`

const EmojiWrapper = styled.div`
  display: inline;
  margin-left: 8px;
  margin-right: 11px;
  font-size: 18px;
`

const IconWrapper = styled.div`
  display: flex;
  margin-right: 8px;

  svg {
    width: 32px;
    height: 32px;
  }
`

function Button({ icon, emoji, primary, children }) {
  return (
    <StyledButton icon={icon || emoji} primary={primary}>
      {emoji && <EmojiWrapper>{emoji}</EmojiWrapper>}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  icon: elementType,
  emoji: string,
  primary: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
}

Button.defaultProps = {
  icon: null,
  emoji: '',
  primary: false,
}

export default Button
