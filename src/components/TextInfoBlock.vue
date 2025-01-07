<template>
  <div class="q-pb-xl q-pr-lg" style="max-width: 800px">
    <div class="info custom-block">
      <p class="custom-block-title">INFO</p>
      <p v-for="(line, index) in lines" :key="index">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TextInfoProps {
  lines: string[]
}

withDefaults(defineProps<TextInfoProps>(), {})
</script>

<style>
.custom-block-title {
  font-weight: 600;
}

.custom-block {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 16px 16px 8px;
  line-height: 24px;
}

.custom-block.info {
  border-color: transparent;
  color: #3c3c43;
  background-color: #8e96aa24;
}
</style>
