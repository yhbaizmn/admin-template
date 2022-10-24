<template>
  <div id="base-container">
    <div class="menu">
      <div class="logo">后台管理模板</div>
      <div class="menu-main">
        <Menu/>
      </div>
    </div>
    <div class="right-container">
      <div class="right-header">
        <div class="bread-box">
          <div
            :class="['bread-item', openIndex === bread.index ? 'bread-item-checked' : '']"
            v-for="bread in breadList"
            :key="bread.index"
            @click="handleClickBread(bread)"
          >{{bread.title}}
            <el-icon
              style="margin-left: 8px"
              :size="16"
              @click.stop="handleClickCloseBread(bread)">
              <Close />
            </el-icon>
          </div>
        </div>
        <el-popover
          placement="bottom"
          trigger="hover"
          :width="150"
        >
          <template #reference>
            <div class="user-box">
              <img src="../../static/images/router-icon/icon1.png"/>
              <span>易宏博</span>
            </div>
          </template>
          <el-button @click="handleClickLoginOut">退出登录</el-button>
        </el-popover>
      </div>
      <div class="router-container">
        <div class="router-main">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Close,
} from '@element-plus/icons-vue'
import { Bread } from '../../store/module/nav-list/nav'
import Menu from '../menu/index.vue'

const store = useStore()
const router = useRouter()
const breadList = computed(() => store.getters['navList/getBreadList'])
const openIndex = computed(() => store.getters['navList/getOpenIndex'])
const handleClickCloseBread = (bread: Bread) => {
  store.commit('navList/delBread', bread)
}
const handleClickBread = (bread: Bread) => {
  router.push(`/${bread.path}`)
  store.commit('navList/changeOpenIndex', bread)
}
const handleClickLoginOut = () => {
  localStorage.clear()
  store.commit('navList/clearBreads')
  router.push({ path: '/login' })
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
