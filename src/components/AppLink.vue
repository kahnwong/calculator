<template>
  <q-route-tab :label="title" :to="link" style="justify-content: left; padding-left: 16px">
  </q-route-tab>
</template>

<script setup lang="ts">
export interface AppLinkProps {
  title: string
  link: string
}

withDefaults(defineProps<AppLinkProps>(), {})
</script>

<style>
.q-tab__label {
  text-transform: capitalize;
}
</style>
