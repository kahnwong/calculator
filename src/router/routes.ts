import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/meetings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/meetings', component: () => import('pages/MeetingsPage.vue') },
      {
        path: '/gke-autopilot',
        component: () => import('pages/GKEAutopilot.vue'),
      },
      {
        path: '/gke-autopilot-spark-job',
        component: () => import('pages/GKEAutopilotSparkJob.vue'),
      },
      {
        path: '/cloud-cost-comparison',
        component: () => import('pages/CloudCostComparison.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
