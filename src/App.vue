<script lang="ts" setup>
import Header from '@/components/Header.vue'
import InputBox from '@/components/InputBox.vue'
import Package from '@/components/Package.vue'
import Deps from '@/components/Deps.vue'
import Download from '@/components/Download.vue'
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
