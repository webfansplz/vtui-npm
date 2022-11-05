<script lang="ts" setup>
import Header from '@/components/Search/Header.vue'
import InputBox from '@/components/Search/InputBox.vue'
import Package from '@/components/Search/Package.vue'
import Deps from '@/components/Search/Deps.vue'
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
  </Div>
</template>
