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
	},
	getters: {
		// getRoadMapItems: state => state.roadMapItems
	},
	modules: {
	}
})
