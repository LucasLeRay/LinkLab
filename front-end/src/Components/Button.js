import styled from 'styled-components'
import { shape, oneOfType, string, arrayOf, node, bool, func } from 'prop-types'
import { cloneElement } from 'react'

function backgroundColor({ selected, primary }) {
  if (selected) return '--color-grey-3'
  if (primary) return '--color-primary'
  return '--color-grey-4'
}

const StyledButton = styled.button`
  position: relative;
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

  background-color: var(${(props) => backgroundColor(props)});
  transition: background-color 0.1s ease;
  color: var(--color-grey-1);

  &:hover {
    background-color: ${({ primary }) => !primary && 'var(--color-grey-3)'};

    svg {
      display: block;
    }
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

const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 16px;
  color: var(--color-grey-2);

  svg {
    display: none;
    font-size: 24px;

    &:hover {
      color: var(--color-grey-1);
    }
  }
`

function Button({
  icon,
  emoji,
  primary,
  center,
  selected,
  children,
  options,
  ...props
}) {
  return (
    <StyledButton
      icon={icon || emoji}
      primary={primary}
      center={center}
      selected={selected}
      {...props}
    >
      {emoji && <EmojiWrapper>{emoji}</EmojiWrapper>}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
      {!!options.length && (
        <OptionsWrapper>
          {options.map((option) =>
            cloneElement(option.icon, {
              onClick: (e) => {
                e.stopPropagation()
                option.action()
              },
              key: option.name,
            }),
          )}
        </OptionsWrapper>
      )}
    </StyledButton>
  )
}

Button.propTypes = {
  icon: shape({}),
  emoji: string,
  primary: bool,
  center: bool,
  selected: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
  options: arrayOf(
    shape({
      name: string,
      icon: shape({}),
      action: func,
    }),
  ),
}

Button.defaultProps = {
  icon: null,
  emoji: '',
  primary: false,
  center: false,
  selected: false,
  options: [],
}

export default Button
