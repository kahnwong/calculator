import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/meeting',
    component: () => import('layouts/MainLayout.vue'),
    // apps
    children: [
      { path: '/meeting', component: () => import('pages/MeetingPage.vue') },
      { path: '/gke-autopilot', component: () => import('pages/GkeAutopilotPage.vue') },
      {
        path: '/gke-autopilot-spark-job',
        component: () => import('pages/GkeAutopilotSparkJobPage.vue'),
      },
      {
        path: '/cloud-cost-comparison',
        component: () => import('pages/CloudCostComparisonPage.vue'),
      },
      {
        path: '/project-quotation',
        component: () => import('pages/ProjectQuotationPage.vue'),
      },
    ],
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
