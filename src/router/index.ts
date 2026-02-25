import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/candidates',
    },
    {
      path: '/candidates',
      name: 'candidates',
      component: () => import('@/views/CandidatesView.vue'),
    },
    {
      path: '/candidates/:id',
      name: 'candidate-detail',
      component: () => import('@/views/CandidateDetailView.vue'),
    },
    {
      path: '/candidates/compare',
      name: 'candidate-compare',
      component: () => import('@/views/CandidateCompareView.vue'),
    },
    {
      path: '/positions',
      name: 'positions',
      component: () => import('@/views/PositionsView.vue'),
    },
    {
      path: '/positions/:id',
      name: 'position-detail',
      component: () => import('@/views/PositionDetailView.vue'),
    },
  ],
})

export default router
