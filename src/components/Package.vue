<script lang="ts" setup>
import type { KeyDataEvent } from 'vue-termui'
import Guide from './Guide.vue'
import { useDepsStore, useSearchStore } from '@/store'
const MAX = 10
const searchStore = useSearchStore()
const depsStore = useDepsStore()
const packages = computed(() => searchStore.packages)
const page = computed(() => searchStore.page)
const keyword = computed(() => searchStore.keyword)

const cursorOffset = ref(0)
const columnIndex = ref(0)
const normalizedCursorOffset = computed(() => Math.min(cursorOffset.value, MAX - 1))
const normalizedPackages = computed(() => {
  return cursorOffset.value > MAX - 1 ? packages.value.slice(cursorOffset.value - MAX + 1, cursorOffset.value + 1) : packages.value.slice(0, MAX)
})

watch(keyword, () => {
  cursorOffset.value = 0
  columnIndex.value = 0
})

function togglePackageVersion(event: KeyDataEvent) {
  const offset = event.key === 'ArrowUp' ? -1 : 1
  const selected = packages.value[cursorOffset.value]
  if (!selected)
    return
  selected.versionIndex = Math.max(0, Math.min(selected.versions.length - 1, selected.versionIndex + offset))
  selected.activeVersion = selected.versions[selected.versionIndex]
}

async function togglePackage(event: KeyDataEvent) {
  const offset = event.key === 'ArrowUp' ? -1 : 1
  const value = cursorOffset.value + offset

  const shouldLoadMore = value >= packages.value.length && event.key === 'ArrowDown'
  shouldLoadMore && await searchStore.search(keyword.value, page.value + 1)

  cursorOffset.value = Math.max(0, Math.min(packages.value.length - 1, value))
}

onKeyData(['ArrowLeft', 'ArrowRight'], async (event) => {
  const offset = event.key === 'ArrowLeft' ? -1 : 1
  columnIndex.value = Math.max(0, Math.min(1, columnIndex.value + offset))
})

onKeyData(['ArrowUp', 'ArrowDown'], async (event) => {
  if (columnIndex.value === 0)
    togglePackage(event)

  else
    togglePackageVersion(event)
})

onKeyData(' ', () => {
  const selected = packages.value[cursorOffset.value]
  if (!selected)
    return
  columnIndex.value = 0
  const name = selected.name
  const version = selected.activeVersion
  if (!depsStore.has(name) && !depsStore.has(name, true)) { depsStore.add({ name, version }) }
  else if (depsStore.has(name)) {
    depsStore.remove(name)
    depsStore.add({ name, version }, true)
  }
  else if (depsStore.has(name, true)) {
    depsStore.remove(name, true)
  }
})

const columns = [
  {
    width: 42,
    name: 'Package Name',
    id: 'name',
    link: 'repoLink',
  },
  {
    width: 20,
    name: 'Version',
    id: 'activeVersion',
  },
  {
    width: 20,
    name: 'Author',
    id: 'author',
    link: 'authorLink',
  },
  {
    width: 15,
    name: 'Downloads',
    id: 'downloads',
  },
] as const
</script>

<template>
  <Div
    width="100"
    borderStyle="single"
    flexDirection="column"
  >
    <template
      v-if="normalizedPackages.length"
    >
      <!-- Header -->
      <Div>
        <Div :width="3" />
        <Div
          v-for="(item, index) in columns"
          :key="index"
          :width="item.width"
          justifyContent="flex-start"
          :paddingLeft="item.id === 'activeVersion' ? 3 : 0"
        >
          <Span color="green">
            {{ item.name }}
          </Span>
        </Div>
      </Div>

      <!-- Content -->
      <Div
        v-for="(item, index) in normalizedPackages"
        :key="index"
      >
        <Div :width="3" justifyContent="flex-end">
          <!-- Package Select Cursor -->
          <template v-if="columnIndex === 0">
            <Span v-if="normalizedCursorOffset === index" color="blue">❯</Span>
            <Span v-else-if="depsStore.has(item.name)" color="#42d392">◉</Span>
            <Span v-else-if="depsStore.has(item.name, true)" color="#647eff">◉</Span>
          </template>
        </Div>
        <Div
          v-for="(column, childIndex) in columns"
          :key="childIndex"
          :width="column.width"
          :paddingRight="2"
          justifyContent="flex-start"
        >
          <!-- Version Cursor -->
          <Div
            v-if="column.id === 'activeVersion'"
            :width="3"
            justifyContent="flex-end"
            :paddingRight="1"
          >
            <Span
              v-if="columnIndex === 1
                && normalizedCursorOffset === index
                && column.id === 'activeVersion'"
              color="blue"
            >❯</Span>
          </Div>
          <Span color="white">
            {{ item[column.id] }}
          </Span>
        </Div>
      </Div>
    </template>
    <Guide v-else />
  </Div>
</template>
