<script lang="ts" setup>
import { ProgressBar } from './ProgressBar'
import { useDepsStore } from '@/store'
import { installPackage } from '@/services/install'
const depsStore = useDepsStore()
const deps = computed(() => depsStore.normalize(depsStore.deps))
const devDeps = computed(() => depsStore.normalize(depsStore.devDeps))
// 0: Not Started 1: In Progress 2: Finished
const downloadStatus = ref(0)
const progress = ref(20)

async function download() {
  if ((!deps.value.length && !devDeps.value.length) || downloadStatus.value === 1)
    return
  downloadStatus.value = 1
  const timer = setInterval(() => {
    if (progress.value < 95)
      progress.value += 2

    else
      clearInterval(timer)
  }, 50)
  await Promise.all([installPackage(deps.value), installPackage(devDeps.value, { isDev: true })])
  depsStore.reset()
  progress.value = 100
  setTimeout(() => {
    downloadStatus.value = 2
  }, 300)
}

onKeyData('Enter', download)
</script>

<template>
  <Div
    width="95"
    :height="3"
    alignItems="center"
    justifyContent="center"
  >
    <Div
      v-if="downloadStatus === 1"
    >
      <Span>
        Downloading:
      </Span>
      <ProgressBar :value="progress" :width="60" />
    </Div>
  </Div>
</template>
