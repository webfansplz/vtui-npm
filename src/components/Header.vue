<script lang="ts" setup>
import { useSearchStore } from '@/store'

const { packSource } = useSearchStore()
</script>

<template>
  <Div
    width="100"
    justifyContent="center"
  >
    <Span color="yellow">
      VTUI NPM SEARCH FROM {{ packSource }}
    </Span>
  </Div>
</template>
