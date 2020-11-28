import { useState } from 'react'
import { string, arrayOf, func } from 'prop-types'
import styled from 'styled-components'

import Modal from './Modal'
import Input from './Input'
import Button from './Button'

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 448px;
  height: 328px;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  button:nth-child(1) {
    margin-right: 24px;
  }

  button:nth-child(2) {
    margin-left: 24px;
  }
`

const Title = styled.h2`
  width: 100%;
  margin: 0;
  text-align: center;
  font-size: 24px;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  > div {
    margin-bottom: 8px;
  }
`

function LinkFormModal({
  id,
  url: defaultUrl,
  tags: defaultTags,
  closeModal,
  onSubmit,
  ...props
}) {
  const [url, setUrl] = useState(defaultUrl)
  const [tags, setTags] = useState(defaultTags.join(', '))

  return (
    <Modal onClickOutSide={closeModal} {...props}>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit({
            id,
            url,
            tags: tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean),
          })
          closeModal()
        }}
      >
        <Title>New Link 🎉</Title>
        <InputWrapper>
          <Input
            label="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Input
            label="Tags"
            subLabel="Separate by commas"
            value={tags}
            onChange={({ target }) => setTags(target.value)}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button center onClick={closeModal}>
            Cancel
          </Button>
          <Button center primary type="submit">
            Create
          </Button>
        </ButtonWrapper>
      </Form>
    </Modal>
  )
}

LinkFormModal.propTypes = {
  id: string,
  url: string,
  tags: arrayOf(string),
  closeModal: func.isRequired,
  onSubmit: func.isRequired,
}

LinkFormModal.defaultProps = {
  id: '',
  url: '',
  tags: [],
}

export default LinkFormModal
