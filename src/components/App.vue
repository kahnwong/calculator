<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '#',
    },
  },
});
</script>
