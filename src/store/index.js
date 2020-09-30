import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    addItem({commit, state}, item){
      commit('addRoadMapItem', state, item);
    },
    removeItem({commit, state}, idx) {
      commit('removeRoadMapItem', state, idx)
    }
  },
  getters: {
    getRoadMapItems: state => state.roadMapItems
  },
  modules: {
  }
})
