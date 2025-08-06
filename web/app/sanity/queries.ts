import { defineQuery } from 'groq'

export const LATEST_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && status == "published"
] | order(publishedAt desc) [0...10] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  person->{
    _id,
    name
  },
  categories[]->{
    _id,
    title
  },
  mainImage {
    alt,
    asset
  }
}`)
