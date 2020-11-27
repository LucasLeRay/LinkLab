import styled from 'styled-components'
import { shape, oneOfType, string, arrayOf, node, bool } from 'prop-types'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'baseline')};
  text-transform: capitalize;

  height: 48px;
  width: calc(100% - 16px);
  margin: 8px;
  padding: 8px 8px 8px ${({ icon, center }) => (icon || center ? '8' : '48')}px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
  border: none;
  outline: inherit;

  background-color: var(
    --color-${({ primary }) => (primary ? 'primary' : 'grey-4')}
  );
  transition: background-color 0.1s ease;
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

function Button({ icon, emoji, primary, center, children, ...props }) {
  return (
    <StyledButton
      icon={icon || emoji}
      primary={primary}
      center={center}
      {...props}
    >
      {emoji && <EmojiWrapper>{emoji}</EmojiWrapper>}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  icon: shape({}),
  emoji: string,
  primary: bool,
  center: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
}

Button.defaultProps = {
  icon: null,
  emoji: '',
  primary: false,
  center: false,
}

export default Button
