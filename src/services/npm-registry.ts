import { $fetch } from 'ohmyfetch'

interface Package {
  package: Package
  score: Score
  searchScore: number
}

interface Score {
  final: number
  detail: Detail
}

interface Detail {
  quality: number
  popularity: number
  maintenance: number
}
interface Author {
  name?: string
  email?: string
  url?: string
}
interface Package {
  name: string
  version: string
  description: string
  keywords: string[]
  date: string
  author?: Author
  links: Links
  publisher: Publisher
  maintainers: Publisher[]
}

interface Publisher {
  username: string
  email: string
}

interface Links {
  npm?: string
  homepage?: string
  repository?: string
  bugs?: string
}

export interface PackageInfo {
  objects: Package[]
  total: number
  time: string
}

export const search = async (
  query: string,
  page = 10,
) => {
  const { objects, count } = await $fetch(`http://registry.npmjs.com/-/v1/search?text=${query}&form=${page}`)
  if (count <= 0)
    return { query, data: [] }

  return { query, data: objects }
}
