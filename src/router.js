import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './common/scss/index.scss'
import  '../static/css/reset.css'
import goods from './components/goods/goods.vue'
import sells from './components/seller/sellers'
import ratings from './components/rating/ratings'
Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

export default new Router({
  routes: [
   
    {
      path: '/goods',
      name: 'goods',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/goods/goods.vue')
    },
    {
      path: '/sellers',
      name: 'sellers',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/seller/sellers.vue')
    },
    {
      path: '/ratings',
      name: 'ratings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/rating/ratings.vue')
    },
   
  ]
})
