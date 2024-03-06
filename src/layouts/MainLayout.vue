<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Apps </q-item-label>

        <Apps v-for="link in apps" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import App from 'components/App.vue';

const linksList = [
  {
    title: 'Meetings',
    link: '/',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    Apps: App,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      apps: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss">
.header {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
