import styled from 'styled-components'

import Sidebar from '../Components/Sidebar'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

function getCategories(links) {
  return links.reduce((acc, { tags }) => {
    return [...acc, ...tags.filter((tag) => !acc.includes(tag))]
  }, [])
}

function Home() {
  const links = [
    {
      id: '123',
      url: 'https://google.fr',
      tags: ['Startup', 'Search Engine'],
    },
    {
      id: '456',
      url: 'https://lucas-le-ray.com',
      tags: ['Startup', 'Web Development'],
    },
    {
      id: '789',
      url: 'https://transpare.eu',
      tags: ['trolls'],
    },
  ]

  return (
    <Container>
      <Sidebar categories={getCategories(links)} />
    </Container>
  )
}

export default Home
