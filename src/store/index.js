import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true


export default new Vuex.Store({
  state: {
    roadMapItems: [],
  },
  mutations: {
    addRoadMapItem(state, item) {
      state.roadMapItems.push(item);
    },
    removeRoadMapItem(state, idx) {
      state.roadMapItems.splice(idx, 1);
    }
  },
  actions: {
    addItem({commit}, item){
      commit('addRoadMapItem', item);
    },
    removeItem({commit}, idx) {
      commit('removeRoadMapItem', idx)
    }
  },
  getters: {
    getRoadMapItems: state => state.roadMapItems
  },
  modules: {
  }
})
