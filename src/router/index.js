import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rankings',
    name: 'Rankings',
    component: () => import(/* webpackChunkName: "Rankings" */ '../views/RankingsView.vue')
  },
  {
    path: '/playoffs',
    name: 'Playoffs',
    component: () => import(/* webpackChunkName: "Playoffs" */ '../views/Playoffs.vue')
  },
  {
    path: '/roadmap',
    name: 'RoadMap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "RoadMap" */ '../views/RoadMap.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
