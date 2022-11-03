<script lang="ts" setup>
import { useSearchStore } from '@/store'
const store = useSearchStore()
store.search('vue')
</script>

<template>
  <Div
    width="100"
  >
    <Span color="yellow">
      Input
    </Span>
  </Div>
</template>
