import fetch from 'node-fetch'

// todo: retrieve first entry until I write more posts xd
const fetchLatestPosts = async () => {
  let data
  try {
    const response = await fetch('https://juanse.dev/api/blog/latest')
    data = await response.json()
  } catch (error) {
    console.log(error)
    return []
  }

  return data.posts
}

export default fetchLatestPosts
