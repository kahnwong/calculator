<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">Monday 4, 2024</div>
      </div>
      <q-img src="public/header.jpg" class="header absolute-top"/>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Apps
        </q-item-label>

        <Apps
          v-for="link in apps"
          :key="link.title"
          v-bind="link"
        />
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
    title: 'Docs',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    link: 'https://github.com/quasarframework'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    Apps: App
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      apps: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
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
