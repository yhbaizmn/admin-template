<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item v-for="(item) in props.forms" :key="item.key" :label="item.name + '：'">
        <el-input
          v-if="item.type === 'input'"
          v-model="formData[item.key]"
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.key]"
        >
          <el-option
            v-for="i in item.tree"
            :key="item.key + i.value"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
        <el-checkbox-group
          v-else-if="item.type === 'checkBox'"
          v-model="formData[item.key]"
        >
          <el-checkbox
            v-for="i in item.tree"
            :key="item.key + i.label"
            :label="i.label"
            :disabled="i.disabled"
          />
        </el-checkbox-group>
        <el-radio-group
          v-else-if="item.type === 'radio'"
          v-model="formData[item.key]"
        >
          <el-radio
            v-for="i in item.tree"
            :key="item.key + i.label"
            :label="i.label"
            :disabled="i.disabled"
          />
        </el-radio-group>
        <el-date-picker
          v-else-if="item.type === 'date'"
          v-model="formData[item.key]"
          :type="item.dateType"
        />
        <el-time-picker
          v-else-if="item.type === 'time'"
          v-model="formData[item.key]"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClickSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClickClear">重置</el-button>
      </el-form-item>
      <slot name="btn"></slot>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableConfig"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <slot name="action"></slot>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[7, 10, 15, 20]"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { TBaseFormItem, TSelecctItem, TCheckBoxItem, TRadioItem, TDateItem, TableConfig } from '@/types/basePage'

const props = defineProps<{
  forms: TBaseFormItem[] | TSelecctItem[] | TCheckBoxItem[] | TRadioItem[] | TDateItem[]
  btns?: any[]
  requestApi: any
  tableConfig: TableConfig[]
}>()

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const formData = reactive<{[p: string]: any}>({})
const tableData = ref<any[]>([])

const search = () => {
  props.requestApi({
    current: currentPage.value,
    size: pageSize.value,
    ...formData
  }).then(ret => {
    total.value = ret?.data?.total
    tableData.value = ret?.data?.records
  })
}
const handleClickSearch = () => {
  console.log('查询条件', formData, currentPage.value, pageSize.value)
  search()
}
onMounted(() => {
  handleClickSearch()
})
const handleClickClear = () => {
  // eslint-disable-next-line guard-for-in
  for (const key in formData) {
    delete formData[key]
  }
  currentPage.value = 1
  handleClickSearch()
}
const handleSizeChange = () => {
  handleClickSearch()
}
const handleCurrentChange = () => {
  handleClickSearch()
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px 10px;
}
</style>
