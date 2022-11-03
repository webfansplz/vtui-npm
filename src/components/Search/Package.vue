<script lang="ts" setup>
import { useSearchStore } from '@/store'
const store = useSearchStore()
const packages = computed(() => store.packages)
const columns = [
  {
    width: 45,
    name: 'Package Name',
    id: 'name',
  },
  {
    width: 15,
    name: 'Version',
    id: 'version',
  },
  {
    width: 20,
    name: 'Author',
    id: 'author',
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
    <!-- Header -->
    <Div>
      <Div :width="5" />
      <Div
        v-for="(item, index) in columns"
        :key="index"
        :width="item.width"
        justifyContent="flex-start"
      >
        <Span color="green">
          {{ item.name }}
        </Span>
      </Div>
    </Div>
    <!-- Content -->
    <Div v-for="(item, index) in packages" :key="index">
      <Div :width="5" />
      <Div
        v-for="(column, childIndex) in columns"
        :key="childIndex"
        :width="column.width"
        justifyContent="flex-start"
      >
        <Span color="white">
          {{ item[column.id] }}
        </Span>
      </Div>
    </Div>
  </Div>
</template>
