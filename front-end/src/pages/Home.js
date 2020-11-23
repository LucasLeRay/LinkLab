import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
import { PulseLoader } from 'react-spinners'

import Sidebar from '../Components/Sidebar'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

function getCategories(links) {
  return links.reduce((acc, { tags }) => {
    return [...acc, ...tags.filter((tag) => !acc.includes(tag))]
  }, [])
}

const LINKS = gql`
  query getLinks {
    links {
      id
      url
      tags
    }
  }
`

function Home() {
  const { loading, data } = useQuery(LINKS)

  return loading ? (
    <LoadingWrapper>
      <PulseLoader size={50} margin={30} color="#ffffff" />
    </LoadingWrapper>
  ) : (
    <Container>
      <Sidebar categories={getCategories(data.links)} />
    </Container>
  )
}

export default Home
