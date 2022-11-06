<script lang="ts" setup>
import { ProgressBar } from './ProgressBar'
import { useDepsStore } from '@/store'
import { installPackage } from '@/services/install'
const depsStore = useDepsStore()
const deps = computed(() => depsStore.normalize(depsStore.deps))
const devDeps = computed(() => depsStore.normalize(depsStore.devDeps))
// 0: Not started 1: In progress 2: Finished
const downloadStatus = ref(0)
const progress = ref(20)

async function download() {
  if ((!deps.value.length && !devDeps.value.length) || downloadStatus.value === 1)
    return
  downloadStatus.value = 1
  const speed = deps.value.length + devDeps.value.length >= 5 ? 100 : 50
  const timer = setInterval(() => {
    if (progress.value < 95)
      progress.value += 2

    else
      clearInterval(timer)
  }, speed)
  await Promise.all([installPackage(deps.value), installPackage(devDeps.value, { isDev: true })]).catch((e) => {
    console.log(e)
    process.exit(1)
  })
  depsStore.reset()
  progress.value = 100
  let t = setTimeout(() => {
    downloadStatus.value = 2
    t = setTimeout(() => {
      downloadStatus.value = 0
      clearTimeout(t)
    }, 2000)
  }, 80)
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
    <Div v-else-if="downloadStatus === 2">
      <Span>
        Download Success 🎉
      </Span>
    </Div>
  </Div>
</template>
