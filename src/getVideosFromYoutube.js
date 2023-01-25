import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

const getVideosFromYoutube = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  }

  const CHANNEL_ID = 'UCaw6pZKpqHpK-I0spCw0eeQ'
  const MAX_RESULTS = 5

  let data

  try {
    const response = await fetch(`https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNEL_ID}&part=snippet%2Cid&order=date&maxResults=${MAX_RESULTS}`, options)
    data = await response.json()
  } catch (error) {
    return []
  }

  const videos = data.items
    .filter(entry => entry.id.kind.split('#')[1] === 'video')
    .map(entry => ({
      title: entry.snippet.title,
      image: entry.snippet.thumbnails.medium.url,
      href: 'https://youtube.com/watch?v=' + entry.id.videoId
    }))
    .slice(0, 3)

  return videos
}

export default getVideosFromYoutube
