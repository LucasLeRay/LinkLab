import { useState } from 'react'
import { string, arrayOf, func } from 'prop-types'
import styled from 'styled-components'

import Modal from './Modal'
import Input from './Input'

const Form = styled.form``

function LinkFormModal({
  url: defaultUrl,
  tags: defaultTags,
  handleSubmit,
  ...props
}) {
  const [url, setUrl] = useState(defaultUrl)
  const [tags] = useState(defaultTags)

  return (
    <Modal {...props}>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        {tags}
      </Form>
    </Modal>
  )
}

LinkFormModal.propTypes = {
  url: string,
  tags: arrayOf(string),
  handleSubmit: func.isRequired,
}

LinkFormModal.defaultProps = {
  url: '',
  tags: [],
}

export default LinkFormModal
