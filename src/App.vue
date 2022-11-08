<script lang="ts" setup>
import { useSearchStore } from './store'
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
