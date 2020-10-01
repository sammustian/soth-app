import Vue from 'vue'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vuex from 'vuex'
import { db } from '@/db';


Vue.use(Vuex)
Vue.config.devtools = true


export default new Vuex.Store({
	state: {
		roadMapItems: [],
	},
	mutations: {
		// addRoadMapItem(state, item) {
		//   state.roadMapItems.push(item);
		// },
		// removeRoadMapItem(state, idx) {
		//   state.roadMapItems.splice(idx, 1);
		// },
		...vuexfireMutations
	},
	actions: {
		bindRoadMapItemsRef: firestoreAction(context => {
			return context.bindFirestoreRef('roadMapItems', db.collection('roadMapItems'))
		}),
		bindAddRoadMapItemRef: firestoreAction((context, item) => {
			return db.collection('roadMapItems').add({
				text: item
			})
		}),
		bindRemoveRoadMapItemRef: firestoreAction((context, id) => {
			return db.collection('roadMapItems').doc(id).delete()
		})
		// addItem: firestoreAction( context => {
		//   context.bindFirestoreRef(
		//     //db.collections()
		//   )
		// }) 
		// addItem({commit}, item){
		//   commit('addRoadMapItem', item);
		// },
		// removeItem({commit}, idx) {
		//   commit('removeRoadMapItem', idx)
		// }
	},
	getters: {
		// getRoadMapItems: state => state.roadMapItems
	},
	modules: {
	}
})
