# 后台管理模板

# 推荐 node 版本 16

1. 安装

```
npm install
```

2. 运行

```
npm run serve
```

- 测试环境打包

```
npm run build_test
```

- 生产环境打包

```
npm run build
```

# 📚 目录

```
├─ .env.xxx // 各环境的配置文件
├─ .eslintrc.js // eslint配置
├─ vue.config.ts // 项目配置
├─ tsconfig.json // ts配置
├─ index.html // 入口文件
└─ src
  │─ App.vue // 根容器
  │─ main.ts
  │
  ├─ components // 组件
  │
  ├─ config // 项目级配置
  │    │
  │    └─index.ts
  │
  ├─ pages // 页面
  │
  ├─ router // 路由
  │
  ├─ servers // 接口
  │   │
  │   │─ request.ts // 封装
  │   └─ api // 接口
  │
  ├─ assets // 静态资源
  │
  ├─ store // 状态管理
  │
  ├─ types // ts类型定义
  │
  └─ utils // 工具库
  │ │  index.ts
  │ │  loading.ts // loading封装
  │ │  toast.ts // 弹窗封装
  │ └─md5
  └─
```
