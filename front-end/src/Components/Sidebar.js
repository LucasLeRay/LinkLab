import { useContext, useState } from 'react'
import { arrayOf, string, func } from 'prop-types'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import SearchIcon from '@material-ui/icons/Search'
import ShareIcon from '@material-ui/icons/ShareOutlined'

import Input from './Input'
import Button from './Button'
import Context from '../Context'
import LinkFormModal from './LinkFormModal'
import useWindowSize from '../hooks/useWindowSize'
import copyClipboard from '../helpers/copyClipboard'

const Container = styled.div`
  top: 0;
  left: 0;
  padding: 8px;
  width: 304px;
  min-width: 304px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-5);

  @media (max-width: 800px) {
    width: 240px;
    min-width: 240px;
  }

  @media (max-width: 600px) {
    width: calc(100% - 48px);
    height: 100%;
    padding: 24px;
    background-color: var(--color-grey-6);
  }
`

const CategoriesSubtitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-left: 8px;
  margin-bottom: 8px;
`

const Header = styled.div`
  padding: 8px;
  width: calc(100% - 16px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;

  h1 {
    margin: 0;
  }

  svg {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
`

function Sidebar({
  categories,
  createLink,
  selectedTag,
  setSelectedTag,
  search,
  setSearch,
}) {
  const { user, handleLogout, setToast } = useContext(Context)
  const [modal, setModal] = useState(false)
  const { width } = useWindowSize()

  return (
    <Container>
      <Header>
        <h1>LOGO</h1>
        <LogoutIcon onClick={handleLogout} />
      </Header>
      {width > 600 && (
        <>
          <Input
            icon={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find anything"
          />
          <Button primary icon={<AddIcon />} onClick={() => setModal(true)}>
            New Link
          </Button>
        </>
      )}
      <CategoriesSubtitle>All categories</CategoriesSubtitle>
      {categories.map((category) => (
        <Button
          options={[
            {
              name: 'Share',
              icon: <ShareIcon />,
              action: async () => {
                await copyClipboard(user.sub, category)
                setToast('Link has been copied in clipboard')
              },
            },
          ]}
          selected={selectedTag === category}
          key={category}
          onClick={() => {
            setSelectedTag(selectedTag === category ? null : category)
          }}
        >
          {category}
        </Button>
      ))}
      {modal && (
        <LinkFormModal
          onSubmit={createLink}
          closeModal={() => {
            setModal(false)
          }}
        />
      )}
    </Container>
  )
}

Sidebar.propTypes = {
  selectedTag: string,
  setSelectedTag: func.isRequired,
  search: string,
  setSearch: func,
  categories: arrayOf(string).isRequired,
  createLink: func,
}

Sidebar.defaultProps = {
  selectedTag: null,
  search: '',
  setSearch: () => {},
  createLink: () => {},
}

export default Sidebar
