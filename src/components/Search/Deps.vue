<script lang="ts" setup>
import { useDepsStore } from '@/store'
const depsStore = useDepsStore()
const deps = computed(() => depsStore.deps)
const devDeps = computed(() => depsStore.devDeps)
</script>

<template>
  <Div>
    <Div
      width="50"
      borderStyle="classic"
      flexDirection="column"
      :paddingLeft="1"
    >
      <Span color="#42d392">Dependencies</Span>
      <Span v-for="(item, index) in deps" :key="index" color="white">
        {{ item.name }}@{{ item.version }}
      </Span>
    </Div>
    <Div
      width="50"
      borderStyle="classic"
      flexDirection="column"
      :paddingLeft="1"
    >
      <Span color="#647eff">DevDependencies</Span>
      <Span v-for="(item, index) in devDeps" :key="index" color="white">
        {{ item.name }}@{{ item.version }}
      </Span>
    </Div>
  </Div>
</template>
