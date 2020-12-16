import { useState } from 'react'
import { string, arrayOf, shape, func } from 'prop-types'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import LinkCard from './LinkCard'
import MobileFooter from './MobileFooter'
import LinkFormModal from './LinkFormModal'
import Input from './Input'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  width: calc(100% - 16px);
  height: 100%;
  overflow: auto;
  padding: 8px;
  justify-content: center;
`

const SearchWrapper = styled.div`
  background-color: var(--color-grey-5);
  display: flex;
  height: 64px;
  width: calc(100% - 16px);
  padding: 8px;

  > div {
    width: 100%;
  }
`

function MobileHome({
  categories,
  links,
  selectedTag,
  setSelectedTag,
  search,
  setSearch,
  createLink,
  updateLink,
  deleteLink,
}) {
  const [mobilePage, setMobilePage] = useState('home')
  const [createModal, setCreateModal] = useState(false)
  const [searchModal, setSearchModal] = useState(false)

  function getSelectedPage() {
    if (createModal) return 'add'
    if (searchModal) return 'search'
    return mobilePage
  }

  return (
    <Container>
      {mobilePage === 'home' && (
        <Sidebar
          categories={categories}
          selectedTag={selectedTag}
          setSelectedTag={(tag) => {
            setSelectedTag(tag)
            setMobilePage('links')
          }}
        />
      )}
      {mobilePage === 'links' && (
        <LinksContainer>
          {links
            .filter((link) => !selectedTag || link.tags.includes(selectedTag))
            .filter(
              (link) =>
                !search ||
                link.title?.includes(search) ||
                link.url?.includes(search),
            )
            .map((link) => (
              <LinkCard
                selectedTag={selectedTag}
                setSelectedTag={(tag) => {
                  if (tag) setSelectedTag(tag)
                }}
                lala={setSearch}
                key={link.id}
                link={link}
                updateLink={(tags) => updateLink(link, tags)}
                deleteLink={() => deleteLink(link)}
              />
            ))}
        </LinksContainer>
      )}
      {createModal && (
        <LinkFormModal
          onSubmit={createLink}
          closeModal={() => {
            setCreateModal(false)
          }}
        />
      )}
      {searchModal && (
        <SearchWrapper>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find anything"
          />
        </SearchWrapper>
      )}
      <MobileFooter
        selected={getSelectedPage()}
        onClickHome={() => {
          setMobilePage('home')
          setSelectedTag('')
          setSearchModal(false)
        }}
        onClickAdd={() => {
          setCreateModal(true)
          setSearchModal(false)
        }}
        onClickSearch={() => {
          setMobilePage('links')
          setSearchModal(!searchModal)
        }}
      />
    </Container>
  )
}

MobileHome.propTypes = {
  categories: arrayOf(
    shape({
      name: string,
      icon: string,
    }),
  ).isRequired,
  links: arrayOf(
    shape({
      id: string,
      title: string,
      img: string,
      url: string,
      tags: arrayOf(string),
    }),
  ),
  selectedTag: string,
  setSelectedTag: func,
  search: string,
  setSearch: func,
  createLink: func,
  updateLink: func,
  deleteLink: func,
}

MobileHome.defaultProps = {
  links: [],
  selectedTag: null,
  setSelectedTag: () => {},
  search: null,
  setSearch: () => {},
  createLink: () => {},
  updateLink: () => {},
  deleteLink: () => {},
}

export default MobileHome
