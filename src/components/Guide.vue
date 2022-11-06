<script lang="ts" setup>
</script>

<template>
  <Div>
    <Div
      width="50"
      :height="10"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Span bold>
        <Span color="yellow">
          Usage guide:
        </Span>
        <Br :n="2" />
        Select Package:  ↑↓ + `space`
        <Br :n="2" />
        Toggle Version:  → + ↑↓
        <Br :n="2" />
        Install Package: `enter`
      </Span>
    </Div>
    <Div
      width="50"
      :height="10"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Span bold>
        <Span color="yellow">
          Credits:
        </Span>
        <Br :n="2" />
        Search powered by <Link href="https://github.com/algolia/algoliasearch-client-javascript" :fallback="false" :inverse="false">Algolia</Link>
        <Br :n="2" />
        Installer powered by <Link href="https://github.com/antfu/ni" :fallback="false" :inverse="false">@antfu/ni</Link>
        <Br :n="2" />
        Terminal UI powered by <Link href="https://github.com/vue-terminal/vue-termui" :fallback="false" :inverse="false">vue-termui</Link>
      </Span>
    </Div>
  </Div>
</template>
