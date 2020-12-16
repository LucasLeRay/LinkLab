import styled from 'styled-components'
import { string, arrayOf, shape, func } from 'prop-types'

import Sidebar from './Sidebar'
import LinkCard from './LinkCard'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  width: 100%;
  padding: 64px;
  overflow: auto;

  @media (max-width: 800px) {
    padding: 8px;
  }

  @media (max-width: 1050px) {
    justify-content: center;
  }

  @media (max-width: 1200px) {
    padding: 24px;
  }
`

function DesktopHome({
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
  return (
    <Container>
      <Sidebar
        categories={categories}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        search={search}
        setSearch={setSearch}
        createLink={createLink}
      />
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
    </Container>
  )
}

DesktopHome.propTypes = {
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

DesktopHome.defaultProps = {
  links: [],
  selectedTag: null,
  setSelectedTag: () => {},
  search: null,
  setSearch: () => {},
  createLink: () => {},
  updateLink: () => {},
  deleteLink: () => {},
}

export default DesktopHome
