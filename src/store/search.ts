import { ref } from '@vue/runtime-core'
import { defineStore } from 'pinia'
import { search as algoliaSearch } from '@/services/algolia'
import { search as npmSearch } from '@/services/npm-registry'
import type { PackageInfo } from '@/services/algolia'

interface DepsInfo {
  name: string
  version: string
}

export const useSearchStore = defineStore('search', () => {
  const page = ref(0)
  const keyword = ref('')
  const packages = ref<PackageInfo[]>([])
  const packSource = ref<'Algolia' | 'NPM'>('Algolia')

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
    packages.value = page.value === 0 ? value : [...packages.value, ...value]
  }

  async function search(k: string, p = 0) {
    page.value = p
    if (k === '') {
      packages.value = []
      return
    }
    if (packSource.value === 'Algolia') {
      const { query, hits } = await algoliaSearch(k, p)
      query === keyword.value && normalizePackages(hits)
    }
    else if (packSource.value === 'NPM') {
      const { query, data } = await npmSearch(k, p)
      query === keyword.value && normalizePackages(data)
    }
  }

  watch(keyword, () => {
    search(keyword.value)
  })

  return { keyword, packages, page, search, packSource }
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
