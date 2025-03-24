import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import DetectView from '@/views/DetectView.vue'
import ResultView from '@/views/ResultView.vue'
import UserSettingsView from '@/views/UserSettingsView.vue'
import ImageSettingsView from '@/views/ImageSettings.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      components: {
        default: LoginView,
      },
      name: 'Login',
    },
    {
      path: '/main',
      name: 'Main',
      components: {
        default: MainView,
      }
    },
    {
      path: '/detected',
      name: 'Detected',
      components: {
        default: DetectView
      }
    },
    {
      path: '/result',
      name: 'Result',
      components: {
        default: ResultView
      }
    },
    {
      path: '/UserSettings',
      name: 'UserSettings',
      components: {
        default: UserSettingsView
      }
    },
    {
      path: '/ImageSettings',
      name: 'ImageSettings',
      components: {
        default: ImageSettingsView
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
