import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useMutation, useQuery } from '@apollo/client'
import { PulseLoader } from 'react-spinners'

import Sidebar from '../Components/Sidebar'
import LinkCard from '../Components/LinkCard'
import useWindowSize from '../hooks/useWindowSize'
import MobileFooter from '../Components/MobileFooter'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
  }
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

const UPDATE_LINK = gql`
  mutation updateLink($input: UpdateLinkInput!) {
    updateLink(input: $input) {
      id
      title
      img
      url
      tags
    }
  }
`

const DELETE_LINK = gql`
  mutation updateLink($input: DeleteLinkInput!) {
    deleteLink(input: $input) {
      id
    }
  }
`

function Home() {
  const [selectedTag, setSelectedTag] = useState(null)
  const [search, setSearch] = useState('')
  const { width } = useWindowSize()

  const { loading, data } = useQuery(LINKS)
  const [createLink] = useMutation(CREATE_LINK, {
    // eslint-disable-next-line no-shadow
    update(cache, { data: { createLink } }) {
      cache.modify({
        fields: {
          links(existingLinks = []) {
            const newLinkRef = cache.writeFragment({
              data: createLink,
              fragment: gql`
                fragment NewLinks on Links {
                  id
                  title
                  img
                  url
                  tags
                }
              `,
            })
            return [...existingLinks, newLinkRef]
          },
        },
      })
    },
  })
  const [updateLink] = useMutation(UPDATE_LINK)
  const [deleteLink] = useMutation(DELETE_LINK, {
    // eslint-disable-next-line no-shadow
    update(cache, { data: { deleteLink } }) {
      cache.modify({
        fields: {
          links(existingLinks = [], { readField }) {
            return existingLinks.filter(
              (link) => deleteLink.id !== readField('id', link),
            )
          },
        },
      })
    },
  })

  const [mobilePage, setMobilePage] = useState('home')

  useEffect(() => {
    if (selectedTag && mobilePage !== 'links') setMobilePage('links')
  }, [selectedTag, mobilePage, setMobilePage])

  return loading ? (
    <LoadingWrapper>
      <PulseLoader size={50} margin={30} color="#ffffff" />
    </LoadingWrapper>
  ) : (
    <>
      <Container>
        {(width > 600 || mobilePage === 'home') && (
          <Sidebar
            categories={getCategories(data.links)}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            search={search}
            setSearch={setSearch}
            createLink={({ url, tags }) => {
              createLink({
                variables: {
                  input: {
                    url,
                    tags,
                  },
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  createLink: {
                    __typename: 'Link',
                    id: 'new',
                    title: '',
                    img: '',
                    url,
                    tags,
                  },
                },
              })
            }}
          />
        )}
        {(width > 600 || mobilePage === 'links') && (
          <LinksContainer>
            {data.links
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
                  updateLink={(tags) => {
                    updateLink({
                      variables: {
                        input: {
                          id: link.id,
                          tags,
                        },
                      },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        updateLink: {
                          __typename: 'Link',
                          id: link.id,
                          title: link.title,
                          img: link.img,
                          url: link.url,
                          tags,
                        },
                      },
                    })
                  }}
                  deleteLink={() => {
                    deleteLink({
                      variables: {
                        input: {
                          id: link.id,
                        },
                      },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        deleteLink: {
                          __typename: 'Link',
                          id: link.id,
                        },
                      },
                    })
                  }}
                />
              ))}
          </LinksContainer>
        )}
      </Container>
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
    </>
  )
}

export default Home
