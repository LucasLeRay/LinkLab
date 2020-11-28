import styled from 'styled-components'
import { gql, useMutation, useQuery } from '@apollo/client'
import { PulseLoader } from 'react-spinners'

import Sidebar from '../Components/Sidebar'
import LinkCard from '../Components/LinkCard'

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

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 64px;
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
      title
      img
      url
      tags
    }
  }
`

const CREATE_LINK = gql`
  mutation createLink($input: CreateLinkInput!) {
    createLink(input: $input) {
      id
      title
      img
      url
      tags
    }
  }
`

function Home() {
  const { loading, data } = useQuery(LINKS)
  const [createLink] = useMutation(CREATE_LINK)

  return loading ? (
    <LoadingWrapper>
      <PulseLoader size={50} margin={30} color="#ffffff" />
    </LoadingWrapper>
  ) : (
    <Container>
      <Sidebar
        categories={getCategories(data.links)}
        createLink={({ url, tags }) => {
          createLink({
            variables: {
              input: {
                url,
                tags,
              },
            },
          })
        }}
      />
      <LinksContainer>
        {data.links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </LinksContainer>
    </Container>
  )
}

export default Home
