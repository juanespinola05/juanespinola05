import { readFileSync, writeFileSync } from 'fs'
import ejs from 'ejs'
import { resolve } from 'path'
import getVideosFromYoutube from './src/getVideosFromYoutube.js'
import fetchLatestPosts from './src/fetchLatestPosts.js'

const TEMPLATE_PATH = resolve('template.ejs')
const README_PATH = resolve('README.md')

const template = readFileSync(TEMPLATE_PATH)

const data = {
  videos: await getVideosFromYoutube(),
  posts: await fetchLatestPosts()
}

const renderedText = ejs.render(template.toString(), data)

writeFileSync(README_PATH, renderedText)
