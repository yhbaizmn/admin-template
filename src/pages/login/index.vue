<template>
  <div class="login_box">
    <div class="form-box">
      <div class="title">登录</div>
      <form>
        <div class="input-box">
          <div class="label">用户名：</div>
          <el-input
            v-model="form.userName"
            size="large"
            placeholder="请输入用户名"
            clearable
          />
          <div class="label">密码：</div>
          <el-input
            v-model="form.passWord"
            size="large"
            placeholder="请输入密码"
            type="password"
            show-password
          />
          <div class="label">验证码：</div>
          <div class="code-box">
            <div class="code-input">
              <el-input
                v-model="form.code"
                size="large"
                placeholder="请输入验证码"
              />
            </div>
            <img />
          </div>
        </div>
      </form>
      <div class="btn" @click="handleClickLogin">登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import bus from '@/utils/bus'

const router = useRouter()
const form = reactive({
  userName: '',
  passWord: '',
  code: ''
})
const afterLoginDo = (userInfo:any) => {
  // 存储路由权限
  localStorage.setItem('routerList', userInfo.routers.join(','))
  localStorage.setItem('token', userInfo.token)
  bus.emit('reloadRouter')
}
const handleClickLogin = () => {
  if (!form.userName || !form.passWord || !form.code) {
    ElMessage({
      message: '请输入完整信息',
      type: 'warning',
    })
    return
  }
  console.log('==登录信息', form)
  setTimeout(() => {
    const userInfo = {
      userName: 'yhb',
      avatar: '',
      token: '123434343432',
      routers: [
        'out1',
        'fater1',
        'fater1/child1',
        'fater1/child2',
        'fater2',
        'fater2/child3',
      ]
    }
    afterLoginDo(userInfo)
    router.push({ path: '/' })
  }, 500)
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
