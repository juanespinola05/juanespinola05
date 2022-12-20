import puppeteer from 'puppeteer'

// ? Video: ytd-rich-item-renderer #content
// ? titulo: yt-formatted-string#video-title
// ? imagen: #thumbnail yt-image img

const getVideosFromYoutube = async () => {
  const VIDEOS_URL = 'https://www.youtube.com/@juanespinola05/videos'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(VIDEOS_URL, {
    waitUntil: 'networkidle2'
  })
  await page.setViewport({
    width: 1200,
    height: 1200
  })

  const videosData = await page.evaluate(() => {
    const videosNodes = document.querySelectorAll('ytd-rich-item-renderer #content')
    const videos = Array.from(videosNodes).slice(0, 3)

    return videos.map(video => {
      const title = video.querySelector('yt-formatted-string#video-title').textContent
      const image = video.querySelector('#thumbnail yt-image img').src
      const link = video.querySelector('#thumbnail').href

      return { title, image, link }
    })
  })

  await browser.close()

  return videosData
}

export default getVideosFromYoutube
