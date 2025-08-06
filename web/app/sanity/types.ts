export interface Person {
  _id: string
  name: string
}

export interface Category {
  _id: string
  title: string
}

export interface SanityImage {
  alt: string
  asset: {
    _ref: string
    _type: string
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt: string
  person: Person
  categories: Category[]
  mainImage?: SanityImage
}

export interface BlogPostsResponse {
  posts: BlogPost[]
}
