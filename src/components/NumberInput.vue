<template>
  <q-input class="q-pa-md" dense :label="label" v-model="model" inputmode="numeric"></q-input>
</template>

<script setup lang="ts">
export interface NumberInputProps {
  label: string
  value: number
}

withDefaults(defineProps<NumberInputProps>(), {})

const model = defineModel({ type: Number })
</script>
