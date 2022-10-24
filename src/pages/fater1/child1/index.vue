<template>
  <div>
    <basePage :forms="forms" :tableConfig="tableConfig" :requestApi="getList">
      <template #btn>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </template>
      <template #action>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">详情</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </basePage>
  </div>
</template>

<script lang="ts" setup>
import basePage from '@/components/basePage/index.vue'
import { getList } from '@/utils/test'

const forms = [
  {
    name: '输入框',
    key: 'usename',
    type: 'input',
  },
  {
    name: '下拉框',
    key: 'sxe',
    type: 'select',
    tree: [
      { label: '男', value: '0' },
      { label: '女', value: '1' },
    ]
  },
  {
    name: '多选框',
    key: 'like',
    type: 'checkBox',
    tree: [
      { label: '唱' },
      { label: '跳' },
      { label: 'rap' },
      { label: '篮球', disabled: true },
    ]
  },
  {
    name: '单选框',
    key: 'eat',
    type: 'radio',
    tree: [
      { label: '苹果' },
      { label: '香蕉' },
      { label: '榴莲' },
      { label: '火龙果', disabled: true },
    ]
  },
  {
    name: '日期',
    key: 'date',
    type: 'date',
    dateType: 'daterange'
  },
  {
    name: '时间',
    key: 'time',
    type: 'time',
  },
]
const tableConfig = [
  {
    prop: 'name',
    label: '姓名',
    width: '150',
  },
  {
    prop: 'state',
    label: '状态',
    width: '120',
  },
  {
    prop: 'city',
    label: '城市',
    width: '150',
  },
  {
    prop: 'address',
    label: '地址',
  }
]
</script>
