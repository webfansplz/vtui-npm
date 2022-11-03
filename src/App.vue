<script lang="ts" setup>
import Header from '@/components/Search/Header.vue'
import Input from '@/components/Search/Input.vue'
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
    <Input />
    <Package />
    <Div>
      <Deps />
    </Div>
  </Div>
</template>
