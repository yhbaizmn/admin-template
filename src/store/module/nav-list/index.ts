import { Module } from 'vuex'
import { toRaw } from 'vue'
import { Bread, NavState } from './nav'

const Nav: Module<NavState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    openIndex: '',
    breadList: []
  },
  getters: {
    getOpenIndex(state: NavState) {
      return state.openIndex
    },
    getBreadList(state: NavState) {
      return state.breadList
    }
  },
  mutations: {
    // 修改面包屑
    addBread(state: NavState, value: Bread) {
      if (!toRaw(state.breadList).find(i => i.index === value.index)) {
        state.breadList.push(value)
      }
      state.openIndex = value.index
    },
    delBread(state: NavState, value: Bread) {
      const index:number = state.breadList.indexOf(value)
      state.breadList.splice(index, 1)
    },
    changeOpenIndex(state: NavState, value: Bread) {
      state.openIndex = value.index
    },
    clearBreads(state: NavState) {
      state.breadList = []
      state.openIndex = ''
    }
  },
  actions: {}
}

export default Nav
