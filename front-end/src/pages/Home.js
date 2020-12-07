import { useState } from 'react'
import styled from 'styled-components'
import { gql, useMutation, useQuery } from '@apollo/client'
import { PulseLoader } from 'react-spinners'

import useWindowSize from '../hooks/useWindowSize'
import DesktopHome from '../Components/DesktopHome'
import MobileHome from '../Components/MobileHome'

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

  const createLinkMutation = ({ url, tags }) => {
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
  }

  const updateLinkMutation = (link, tags) => {
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
  }

  const deleteLinkMutation = (link) => {
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
  }

  if (loading)
    return (
      <LoadingWrapper>
        <PulseLoader size={50} margin={30} color="#ffffff" />
      </LoadingWrapper>
    )

  return width > 600 ? (
    <DesktopHome
      categories={getCategories(data.links)}
      links={data.links}
      selectedTag={selectedTag}
      setSelectedTag={setSelectedTag}
      search={search}
      setSearch={setSearch}
      createLink={createLinkMutation}
      updateLink={updateLinkMutation}
      deleteLink={deleteLinkMutation}
    />
  ) : (
    <MobileHome
      categories={getCategories(data.links)}
      links={data.links}
      selectedTag={selectedTag}
      setSelectedTag={setSelectedTag}
      search={search}
      setSearch={setSearch}
      createLink={createLinkMutation}
      updateLink={updateLinkMutation}
      deleteLink={deleteLinkMutation}
    />
  )
}

export default Home
