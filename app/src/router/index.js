import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/graph/:id',
      name: 'Graph',
      component: () => import('../views/DataGraph.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/CrashSearch.vue'),
    },
  ],
})

export default router
