<script lang="ts" setup>
import type { KeyDataEvent } from 'vue-termui'
import { useSearchStore } from './store'
import Header from '@/components/Header.vue'
import InputBox from '@/components/InputBox.vue'
import Package from '@/components/Package.vue'
import Deps from '@/components/Deps.vue'
import Download from '@/components/Download.vue'
const { toggleRegistry } = useSearchStore()

// toggle search registry (algolia by default)
if (process.argv.includes('-n') || process.argv.includes('--npm'))
  toggleRegistry('npm')

// Exit the process manually when press ctrl + c
const stop = onInputData((e) => {
  const event = e.event as KeyDataEvent
  if (event!.key === 'C' && event!.ctrlKey) {
    stop()
    process.exit(0)
  }
})
</script>

<template>
  <Div
    :width="100"
    borderStyle="double"
    flexDirection="column"
  >
    <Header />
    <InputBox />
    <Package />
    <Deps />
    <Download />
  </Div>
</template>
