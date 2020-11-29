import fetch from 'node-fetch'
import cheerio from 'cheerio'

export default async (url: string): Promise<{ title: string; img: string }> => {
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)

  function getTitle() {
    const title = $('title').first().text()
    const og = $('meta[property="og:title"]').text()
    const twitter = $('meta[name="twitter:title"]').text()
    const h1 = $('h1').text()
    return title || og || twitter || h1
  }

  function getImg() {
    const rel = $('link[rel="image_src"]').attr('href')
    const og = $('meta[property="og:image"]').attr('content')
    const twitter = $('meta[name="twitter:image"]').attr('content')
    const firstImg = $('img').first().attr('src')

    const img = rel || og || twitter || firstImg
    return img[0] === '/' ? `${new URL(url)}${img.slice(1)}` : img
  }

  return {
    img: getImg(),
    title: getTitle(),
  }
}
