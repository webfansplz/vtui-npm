<script lang="ts" setup>
import { useSearchStore } from './store'
import type { KeyDataEvent } from 'vue-termui'
import Header from '@/components/Header.vue'
import InputBox from '@/components/InputBox.vue'
import Package from '@/components/Package.vue'
import Deps from '@/components/Deps.vue'
import Download from '@/components/Download.vue'
const { changeSource } = useSearchStore()

// change search source
if (process.argv.includes('-n') || process.argv.includes('--npm'))
  changeSource('NPM')
else if (process.argv.includes('-al') || process.argv.includes('--algolia'))
  changeSource('Algolia')

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
