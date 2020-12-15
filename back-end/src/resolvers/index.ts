import links from './queries/links'
import categories from './queries/categories'
import createLink from './mutations/createLink'
import updateLink from './mutations/updateLink'
import deleteLink from './mutations/deleteLink'
import updateCategoryIcon from './mutations/updateCategoryIcon'

export default {
  Query: {
    links,
    categories,
  },
  Mutation: {
    createLink,
    updateLink,
    deleteLink,
    updateCategoryIcon,
  },
}
