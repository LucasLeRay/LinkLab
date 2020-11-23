import { Link } from '../../generated/schema'

function links(): Array<Link> {
  return [
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
}

export default links
