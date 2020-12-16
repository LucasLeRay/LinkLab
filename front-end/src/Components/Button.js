import styled from 'styled-components'
import { shape, oneOfType, string, arrayOf, node, bool, func } from 'prop-types'
import { cloneElement, useState } from 'react'
import Picker from 'emoji-picker-react'

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
  padding: 2px;
  border-radius: 2px;

  &:hover {
    background-color: ${({ hoverable }) => hoverable && 'var(--color-grey-2)'};
  }
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

const PickerWrapper = styled.div`
  margin-left: 8px;

  .emoji-picker-react {
    box-shadow: none;
    width: 288px;
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
  changeEmoji,
  ...props
}) {
  const [selectEmoji, setSelectEmoji] = useState(false)

  return (
    <>
      <StyledButton
        icon={icon || emoji}
        primary={primary}
        center={center}
        selected={selected}
        {...props}
      >
        {emoji && (
          <EmojiWrapper
            onClick={
              changeEmoji
                ? (e) => {
                    e.stopPropagation()
                    setSelectEmoji(!selectEmoji)
                  }
                : () => {}
            }
            hoverable={!!changeEmoji}
          >
            {emoji}
          </EmojiWrapper>
        )}
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
      {!!selectEmoji && (
        <PickerWrapper>
          <Picker
            onEmojiClick={(event, emojiObject) => {
              setSelectEmoji(false)
              changeEmoji(emojiObject.emoji)
            }}
          />
        </PickerWrapper>
      )}
    </>
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
  changeEmoji: func,
}

Button.defaultProps = {
  icon: null,
  emoji: '',
  primary: false,
  center: false,
  selected: false,
  options: [],
  changeEmoji: null,
}

export default Button
