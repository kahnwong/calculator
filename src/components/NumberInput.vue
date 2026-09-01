<template>
  <q-input class="q-pa-md" dense :label="label" v-model="model" inputmode="numeric"></q-input>
</template>

<script lang="ts">
export interface NumberInputProps {
  label: string
  value: number
}
</script>

<script setup lang="ts">
withDefaults(defineProps<NumberInputProps>(), {})

const model = defineModel({ type: Number })
</script>
