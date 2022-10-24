/* eslint-disable */
import pageRouter from '@/config/router'
import { Route } from '@/types/common'
import { RouteRecordRaw } from 'vue-router'

export function getMyRouter (routes:Route[]):RouteRecordRaw[] {
  const localRouterList = localStorage.getItem('routerList') ? localStorage.getItem('routerList')?.split(',') as string[] : []
  let result: RouteRecordRaw[] = []
  for (let i = 0; i < routes.length; i++) {
    // 过滤路由权限
    if (!localRouterList.includes(routes[i].path)) {
      continue
    }
    if (routes[i].children) {
      result = result.concat(getMyRouter(routes[i].children as Route[]))
    } else {
      const pathStr: string = routes[i].path.substr(1)
      const name = pathStr.split('/').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join('')
      let route: RouteRecordRaw = {
        path: routes[i].path,
        name,
        component: () => import(`@/pages/${routes[i].path}/index`),
        meta: {
          title: routes[i].name,
          icon: routes[i]?.icon
        }
      }
      result.push(route)
    }
  }
  return result
}

export const DataList = [
  {
    path: '/',
    redirect: '/base'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: 'not-found' */ '@/pages/not-found/index'),
    meta: {
      title: 'NotFound',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: 'Login',
    }
  },
  {
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
  }
]
