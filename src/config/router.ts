import { Route } from '@/types/common'

export default [
  {
    path: 'out1',
    name: '单层路由',
    icon: 'icon1.png',
  },
  {
    path: 'fater1',
    name: '父模块1',
    icon: 'icon1.png',
    children: [
      {
        path: 'fater1/child1',
        name: '子模块1'
      },
      {
        path: 'fater1/child2',
        name: '子模块2'
      },
    ]
  },
  {
    path: 'fater2',
    name: '父模块2',
    icon: 'icon1.png',
    children: [
      {
        path: 'fater2/child3',
        name: '子模块3'
      },
      {
        path: 'fater2/child4',
        name: '子模块4'
      },
    ]
  }
] as Route[]
