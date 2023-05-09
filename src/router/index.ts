import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {TrendCharts, List, User} from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/echarts',
        name: 'echarts',
        component: () => import('../views/home/children/EchartsView.vue'),
        meta: {
          title: '图表展示',
          icon: TrendCharts
        }
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/home/children/PayList.vue'),
        meta: {
          title: '缴费管理',
          icon: List
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/home/children/UserOne.vue'),
        meta: {
          title: '住户信息',
          icon: User
        },
        children: [
          {
            path: '/userlist',
            name: 'userlist',
            component: () => import('../views/home/children/UserList.vue'),
            meta: {
              classifyTitle: '住户信息',
              title: '住户信息列表'
            }
          },
          {
            path: '/userupdate',
            name: 'userupdate',
            component: () => import('../views/home/children/UserUpdate.vue'),
            meta: {
              classifyTitle: '住户信息',
              title: '住户信息更新'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
