import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { PulseLoader } from 'react-spinners'
import LinkCard from '../Components/LinkCard'

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div``

const Header = styled.div`
  position: relative;
  height: 72px;
  padding: 8px 32px 0;
  width: calc(100% - 64px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  b {
    text-transform: capitalize;
    color: var(--color-primary);
  }

  h1 {
    margin: 0;
    text-align: center;
  }

  @media (max-width: 800px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    justify-content: center;
    margin-bottom: 0;
  }

  :after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 72px;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to top,
      rgba(15, 15, 15, 0),
      rgba(15, 15, 15, 1) 90%
    );
    width: 100%;
    height: 16px;
  }
`

const LinksContainer = styled.div`
  height: calc(100vh - 96px);
  display: flex;
  overflow: auto;
  align-content: flex-start;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;
`

const LogoWrapper = styled.h1`
  @media (max-width: 500px) {
    display: none;
  }
`

const LINKS = gql`
  query getLinks($tag: String, $userId: String) {
    links(tag: $tag, userId: $userId) {
      id
      title
      img
      url
      tags
    }
  }
`

function Board() {
  const { userId, tag } = useParams()
  const { loading, data, error } = useQuery(LINKS, {
    variables: {
      userId,
      tag,
    },
  })

  if (error) return error

  if (loading) {
    return (
      <LoadingWrapper>
        <PulseLoader size={50} margin={30} color="#ffffff" />
      </LoadingWrapper>
    )
  }

  return (
    <Container>
      <Header>
        <h1>
          {'Links about '}
          <b>{tag}</b>
        </h1>
        <LogoWrapper>LOGO</LogoWrapper>
      </Header>
      <LinksContainer>
        {data.links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </LinksContainer>
    </Container>
  )
}

export default Board
