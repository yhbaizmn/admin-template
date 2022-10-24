<template>
  <div v-for="item in data" :key="item.index">
    <el-sub-menu :index="item.index" v-if="item?.children?.length">
      <template #title>
        <img
          :src="require(`../../static/images/router-icon/${item.icon}`)"
          v-if="item.icon"
          :style="iconStyle"
        />
        <span>{{item.title}}</span>
      </template>
      <menuItem :data="item.children"/>
    </el-sub-menu>
    <el-menu-item :index="item.index" @click="handleToPath(item)" v-else>
      <img
        :src="require(`../../static/images/router-icon/${item.icon}`)"
        v-if="item.icon"
        :style="iconStyle"
      />
      <span>{{item.title}}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { MenuTree } from './menu'

const router = useRouter()
const store = useStore()
type Props = {
  data: MenuTree[]
}
defineProps<Props>()
const handleToPath = (item: MenuTree) => {
  router.push(`/${item.path}`)
  store.commit('navList/addBread', {
    title: item.title,
    index: item.index,
    path: item.path
  })
}
const iconStyle = ref({ width: '20px', height: '20px' })
</script>
