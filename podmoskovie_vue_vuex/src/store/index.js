import Vue from 'vue'
import Vuex from 'vuex'
import towns from './modules/towns.js'
import rivers from './modules/rivers.js'
import parks from './modules/parks.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      towns: towns,
      rivers: rivers,
      parks: parks
    }
})