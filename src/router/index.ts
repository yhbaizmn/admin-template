/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import pageRouter from '@/config/router'
import bus from '@/utils/bus'
import { DataList, getMyRouter } from './routers/base'

const routerInstance = createRouter({
  history: createWebHistory(),
  routes: DataList,
})
bus.on('reloadRouter', () => {
  routerInstance.addRoute({
    path: '/base',
    name: 'Base',
    redirect: '/base/welcome',
    component: () => import('@/layout/base/index.vue'),
    children: [
      ...getMyRouter(pageRouter),
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('@/pages/welcome/index.vue')
      }
    ]
  })
})
routerInstance.beforeEach((to, _, next) => {
  if (!localStorage.getItem('token') && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default routerInstance
