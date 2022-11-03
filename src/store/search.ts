import { ref } from '@vue/runtime-core'
import { defineStore } from 'pinia'
import { search as algoliaSearch } from '@/services/algolia'
import type { PackageInfo } from '@/services/algolia'

export const useSearchStore = defineStore('search', () => {
  const packages = ref<PackageInfo[]>([])

  function normalizePackages(data: PackageInfo[]) {
    packages.value = data.map(item => ({
      ...item,
      downloads: item.humanDownloadsLast30Days,
      author: item.owner.name,
    }))
  }

  async function search(keyword: string) {
    const { hits } = await algoliaSearch(keyword)
    normalizePackages(hits)
  }

  return { packages, search }
})
