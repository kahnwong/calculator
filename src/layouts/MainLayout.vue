<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Calculator</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <Apps v-for="link in apps" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
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
  {
    title: 'GKE Autopilot',
    link: '/gke-autopilot',
  },
  {
    title: 'GKE Autopilot: Spark Job',
    link: '/gke-autopilot-spark-job',
  },
  {
    title: 'Cloud Cost Comparison',
    link: '/cloud-cost-comparison',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    Apps: App,
  },

  setup() {
    return {
      apps: linksList,
      drawer: ref(false),
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
