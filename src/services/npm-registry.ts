import { $fetch } from 'ohmyfetch'

interface PackageInfo {
  name: string
  version: string
  description: string
  keywords: string[]
  date: string
  author?: {
    name?: string
    email?: string
    url?: string
  }
  links?: {
    npm?: string
    homepage?: string
    repository?: string
    bugs?: string
  }
  publisher?: {
    username: string
    email: string
  }
  maintainers?: {
    username: string
    email: string
  }[]
}

export interface NpmPackageInfo {
  package: PackageInfo
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
}

let controller: AbortController | null = null

export const search = async (
  query: string,
  page = 10,
) => {
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  const res = await $fetch(`http://registry.npmjs.com/-/v1/search?text=${query}&from=${page}`, { signal }).catch((e) => {
    return { count: 0 }
  })
  if (res.count <= 0)
    return { query, hits: [] }

  return { query, hits: res.objects }
}
