import { Link } from '../../generated/schema'

function links(): Array<Link> {
  return [
    {
      id: '123',
      title: 'Google Search',
      img:
        'https://4wearegamers.com/wp-content/uploads/2018/06/Google-Wallpaper-11.jpeg',
      url: 'https://google.fr',
      tags: ['Startup', 'Search Engine'],
    },
    {
      id: '456',
      title: 'Lucas Le Ray',
      img:
        'https://lucas-le-ray.com/static/me-d2fc1c80e55cbf91385ed1f6d68d3069.png',
      url: 'https://lucas-le-ray.com',
      tags: ['Startup', 'Web Development'],
    },
    {
      id: '789',
      title: 'Transpare',
      img: 'https://techsnooper.io/wp-content/uploads/2019/06/Transpare.png',
      url: 'https://transpare.eu',
      tags: ['trolls'],
    },
  ]
}

export default links
