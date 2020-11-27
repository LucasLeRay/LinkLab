/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react'
import { func, element } from 'prop-types'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const DOMelement = document.body.appendChild(document.createElement('div'))

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: var(--color-grey-6);
  border-radius: 5px;
  margin: 20px;
`

function Modal({ onClickOutSide, children }) {
  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return createPortal(
    <Background onClick={onClickOutSide} className={Background}>
      <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
    </Background>,
    DOMelement,
  )
}

Modal.propTypes = {
  onClickOutSide: func,
  children: element.isRequired,
}

Modal.defaultProps = {
  onClickOutSide: () => {},
}

export default Modal
