import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { THaveCode, THttpResponse } from './request.d'
import loading from '@/utils/loading'

const baseURL = process.env.VUE_APP_URL
const headers: AxiosRequestHeaders = {}
headers['Content-Type'] = 'application/json;charset=utf-8'
headers['Access-Control-Allow-Origin'] = '*'

declare module 'axios' {
  export interface AxiosRequestConfig {
    useFormData?: boolean
    useUpload?: boolean
  }
}

// axios实例
const instance = axios.create({
  withCredentials: true,
  timeout: 15 * 1000,
  baseURL,
  headers: {
    ...headers,
    channel: 2
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loading.show()
    // 表单请求
    if (config.useFormData) {
      (config.headers as AxiosRequestHeaders)['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    }
    // form-data上传
    if (config.useUpload) {
      (config.headers as AxiosRequestHeaders)['Content-Type'] = 'multipart/form-data'
    }
    // 携带token
    if (localStorage.getItem('token')) {
      (config.headers as AxiosRequestHeaders).token = localStorage.getItem('token') as string
    }
    return config
  },
  error => {
    loading.hide()
    ElMessage({
      message: error,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<THttpResponse & THaveCode>) => {
    loading.hide()
    const { data, status } = response
    if (status === 200) {
      if (data.code === 200) {
        return data
      }
      if (data.code === 403 || data.code === 401) {
        router.push({ path: '/login', replace: true })
        localStorage.clear()
        ElMessage({
          message: '登录过期，请重新登录',
          type: 'error',
        })
        return Promise.reject(new Error('登录过期，请重新登录'))
      }
      ElMessage({
        message: data.message || '返回错误',
        type: 'error',
      })
      return Promise.reject(new Error(data.message || '返回错误'))
    }
    ElMessage({
      message: `请求错误${status}`,
      type: 'error',
    })
    return Promise.reject(new Error(`请求错误${status}`))
  },
  error => {
    loading.hide()
    const { response } = error
    const resData = response?.data
    const errorMsg = `${response?.status || error.message}：请求出错啦 ~`
    if (resData?.message && resData?.code) {
      ElMessage({
        message: `${resData.code}:${resData.message}`,
        type: 'error',
      })
    } else {
      ElMessage({
        message: errorMsg,
        type: 'error',
      })
    }
    return Promise.reject(response)
  }
)

export default instance
