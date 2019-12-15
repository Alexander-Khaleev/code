import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Towns from './views/Towns.vue'
import Rivers from './views/Rivers.vue'
import Parks from './views/Parks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home
    },
    {
      path: '/towns',
      name: 'towns',
      component: Towns
    },
    {
      path: '/rivers',
      name: 'rivers',
      component: Rivers
    },
    {
      path: '/parks',
      name: 'parks',
      component: Parks
    }
  ]
})
