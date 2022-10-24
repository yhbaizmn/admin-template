<template>
  <el-menu
    unique-opened
    :default-active="checkedIndex"
  >
    <menuItem :data="data"/>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { useStore } from 'vuex'
import menuItem from './menuItem.vue'
import pageRouter from '@/config/router'
import { Route } from '@/types/common'
import { MenuTree } from './menu'

const store = useStore()
const localRouterList = localStorage.getItem('routerList') ? localStorage.getItem('routerList')?.split(',') as string[] : []
function getMenuData(routes: Route[], faterIndex: string): MenuTree[] {
  const menus: MenuTree[] = []
  for (let i = 0; i < routes.length; i++) {
    if (!localRouterList.includes(routes[i].path)) {
      // eslint-disable-next-line no-continue
      continue
    }
    const menu: MenuTree = {
      index: `${faterIndex}${(i + 1)}`,
      title: routes[i].name,
      path: `base/${routes[i].path}`,
    }
    if (routes[i].icon) menu.icon = routes[i].icon
    if (routes[i]?.children?.length) {
      menu.children = getMenuData(routes[i]?.children as Route[], `${menu.index}-`)
    }
    menus.push(menu)
  }
  return menus
}
const data = reactive<MenuTree[]>(getMenuData(pageRouter, ''))
const checkedIndex = ref('0')
watch(() => store.getters['navList/getOpenIndex'], (value:string) => {
  checkedIndex.value = value
})
</script>
