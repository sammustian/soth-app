import Vue from 'vue'
import Vuex from 'vuex'
import { SET_SELECTED_WEEK, SET_SELECTED_YEAR } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedWeek: 12,
    selectedYear: 2020,
  },
  mutations: {
    [SET_SELECTED_WEEK](state, payload) {
      state.selectedWeek = payload
    },
    [SET_SELECTED_YEAR](state, payload) {
      state.selectedYear = payload
    },
  },
  actions: {
    setSelectedWeek({ commit }, payload) {
      commit(SET_SELECTED_WEEK, payload)
    },
    setSelectedYear({ commit }, payload) {
      commit(SET_SELECTED_YEAR, payload)
    },
  },
  getters: {
    selectedWeek: (state) => state.selectedWeek,
    selectedYear: (state) => state.selectedYear,
  },
  modules: {},
})
