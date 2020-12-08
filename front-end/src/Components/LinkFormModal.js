import { useState } from 'react'
import { string, arrayOf, func, bool } from 'prop-types'
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

  @media (max-width: 600px) {
    width: 300px;
  }
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
  url: defaultUrl,
  tags: defaultTags,
  closeModal,
  onSubmit,
  update,
  title,
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
            url,
            tags: tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean),
          })
          closeModal()
        }}
      >
        <Title>{update ? title : 'New Link 🎉'}</Title>
        <InputWrapper>
          <Input
            label="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            disabled={update}
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
            {update ? 'Update' : 'Create'}
          </Button>
        </ButtonWrapper>
      </Form>
    </Modal>
  )
}

LinkFormModal.propTypes = {
  url: string,
  tags: arrayOf(string),
  closeModal: func.isRequired,
  onSubmit: func.isRequired,
  update: bool,
  title: string,
}

LinkFormModal.defaultProps = {
  url: '',
  tags: [],
  update: false,
  title: '',
}

export default LinkFormModal
