import { useState } from 'react'
import { string, arrayOf, shape, func } from 'prop-types'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import LinkCard from './LinkCard'
import MobileFooter from './MobileFooter'

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
          search={search}
          setSearch={setSearch}
          createLink={createLink}
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
                setSelectedTag={setSelectedTag}
                key={link.id}
                link={link}
                updateLink={(tags) => updateLink(link, tags)}
                deleteLink={() => deleteLink(link)}
              />
            ))}
        </LinksContainer>
      )}
      <MobileFooter
        selected={mobilePage}
        onClickHome={() => {
          setMobilePage('home')
          setSelectedTag('')
        }}
        onClickAdd={() => {
          setMobilePage('add')
          setSelectedTag('')
        }}
        onClickSearch={() => {
          setMobilePage('search')
          setSelectedTag('')
        }}
      />
    </Container>
  )
}

MobileHome.propTypes = {
  categories: arrayOf(string).isRequired,
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
