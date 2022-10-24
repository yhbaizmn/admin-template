import request from '../request'

// 登录
export const login = (data: {
  userName: string
  passWord: string
  code: string
}) => {
  return request({
    method: 'get',
    url: '/research/expertForum/listZLB',
    data,
  })
}
