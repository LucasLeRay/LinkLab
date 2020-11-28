import links from './queries/links'
import createLink from './mutations/createLink'

export default {
  Query: {
    links,
  },
  Mutation: {
    createLink,
    updateLink: () => {},
    deleteLink: () => {},
    updateTagIcon: () => {},
  },
}
