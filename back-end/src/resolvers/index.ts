import links from './queries/links'
import createLink from './mutations/createLink'
import updateLink from './mutations/updateLink'
import deleteLink from './mutations/deleteLink'

export default {
  Query: {
    links,
  },
  Mutation: {
    createLink,
    updateLink,
    deleteLink,
    updateTagIcon: () => {},
  },
}
