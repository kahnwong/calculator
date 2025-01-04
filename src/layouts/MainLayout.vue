<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Calculator </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="500" :width="200">
      <q-tabs vertical align="left" dense>
        <q-item-label header class="text-bold">
          <span class="text-primary">Apps</span>
        </q-item-label>

        <AppLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-tabs>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLink, { type AppLinkProps } from 'components/AppLink.vue'

const linksList: AppLinkProps[] = [
  {
    title: 'Meeting Cost Calculator',
    link: '/meeting',
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
  {
    title: 'Project Quotation',
    link: '/project-quotation',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
