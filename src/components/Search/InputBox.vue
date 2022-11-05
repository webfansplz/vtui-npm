<script lang="ts" setup>
import { Input } from './Input'
import { useSearchStore } from '@/store'
const store = useSearchStore()
</script>

<template>
  <Div
    width="100"
    :paddingX="4"
  >
    <Input v-model="store.keyword" placeholder="Typing keyword to search package" />
  </Div>
</template>
