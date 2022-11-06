<script lang="ts" setup>
import type { PackageScripts } from '@pnpm/types'
import {  readProjectManifestOnly } from '@pnpm/cli-utils'
import { execScript } from '@/services/ni'
const scripts = ref<{ key: string;value: string }[]>([])
const tabIndex = ref(0)

function normalizeScripts(scripts: PackageScripts | undefined) {
  return Object.keys(scripts ?? {}).map(key => ({
    key,
    value: scripts![key],
  }))
}
async function getScripts() {
  const manifest = await readProjectManifestOnly(process.cwd(), {})
  scripts.value = normalizeScripts(manifest.scripts)
}

function toggleTab(offset: number) {
  tabIndex.value = Math.max(0, Math.min(tabIndex.value + offset, Object.keys(scripts.value).length - 1))
}

onKeyData(['ArrowUp', 'ArrowDown'], (event) => {
  toggleTab(event.key === 'ArrowUp' ? -1 : 1)
})

onKeyData(['Enter'], async () => {
  await execScript(scripts.value[tabIndex.value]?.key)
  process.exit(0)
})

getScripts()
</script>

<template>
  <Div
    :width="100"
    :marginY="2"
    flexDirection="column"
  >
    <Div v-for="(item, index) in scripts" :key="index">
      <Div :width="3">
        <Span v-if="tabIndex === index" bold color="blue">
          ❯
        </Span>
      </Div>
      <Span
        bold
        color="yellow"
      >
        {{ item.key }}
      </Span>
      <Span dimmed>  ({{ item.value }})</Span>
    </Div>
  </Div>
</template>
