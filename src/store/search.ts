import { ref } from '@vue/runtime-core'
import { defineStore } from 'pinia'
import { search as algoliaSearch } from '@/services/algolia'
import { search as npmSearch } from '@/services/npm-registry'
import type { PackageInfo } from '@/services/algolia'
import type { NpmPackageInfo } from '@/services/npm-registry'

interface DepsInfo {
  name: string
  version: string
}

// for algolia registry
function normalizePackages(data: PackageInfo[]) {
  const value = data.map((item) => {
    const versions = item.versions as unknown as Record<string, string>
    const normalizedVersions = Object.keys(versions).sort((a, b) => new Date(versions[b]).getTime() - new Date(versions[a]).getTime())
    return {
      ...item,
      downloads: item.humanDownloadsLast30Days,
      author: item.owner.name,
      versions: [...new Set([item.version, ...normalizedVersions])],
      versionIndex: 0,
      activeVersion: item.version,
      repoLink: item.repository?.url,
      authorLink: item.owner?.link,
    }
  })
  return value
}

// for npm registry
function normalizeNpmPackages(data: NpmPackageInfo[]) {
  const value = data.map(({ package: item }) => {
    return {
      ...item,
      downloads: '---',
      humanDownloadsLast30Days: '',
      descriptions: item.description,
      author: item.author?.name ?? '',
      versions: [item.version],
      versionIndex: 0,
      activeVersion: item.version,
      repoLink: item.links?.repository,
      authorLink: item.author?.url,
      owner: {
        link: item.author?.url,
        name: item.author?.name,
      },
      repository: {
        url: item.links?.repository,
      },
    }
  }) as PackageInfo[]
  return value
}

export const useSearchStore = defineStore('search', () => {
  const page = ref(0)
  const keyword = ref('')
  const packages = ref<PackageInfo[]>([])
  const searchRegistry = ref<'algolia' | 'npm'>('algolia')

  async function search(k: string, p = 0) {
    page.value = p
    if (k === '') {
      packages.value = []
      return
    }
    const request = {
      algolia: algoliaSearch,
      npm: npmSearch,
    }[searchRegistry.value]

    const normalize = {
      algolia: normalizePackages,
      npm: normalizeNpmPackages,
    }[searchRegistry.value]

    const result = await request(k, p).catch((e) => {
      setTimeout(() => {
        console.log(e)
      }, 2000)
      return { query: null, hits: [] }
    })

    if (result.query === keyword.value) {
      const normalizedResult = normalize(result.hits)
      packages.value = page.value === 0 ? normalizedResult : [...packages.value, ...normalizedResult]
    }
  }

  function toggleRegistry(source: 'algolia' | 'npm') {
    searchRegistry.value = source
  }

  watch(keyword, () => {
    search(keyword.value)
  })

  return { keyword, packages, page, search, searchRegistry, toggleRegistry }
})

export const useDepsStore = defineStore('deps', () => {
  const deps = ref<DepsInfo[]>([])
  const devDeps = ref<DepsInfo[]>([])
  const add = (dep: DepsInfo, isDev = false) => {
    if (isDev)
      devDeps.value = [...devDeps.value, dep]
    else
      deps.value = [...deps.value, dep]
  }
  const remove = (name: string, isDev = false) => {
    if (isDev)
      devDeps.value = devDeps.value.filter(item => item.name !== name)
    else
      deps.value = deps.value.filter(item => item.name !== name)
  }
  const has = (name: string, isDev = false) => {
    if (isDev)
      return devDeps.value.some(item => item.name === name)
    else
      return deps.value.some(item => item.name === name)
  }
  const normalize = (deps: DepsInfo[]) => {
    return deps.map(item => `${item.name}@${item.version}`)
  }
  const reset = () => {
    deps.value = []
    devDeps.value = []
  }
  return { deps, devDeps, add, remove, has, normalize, reset }
})
