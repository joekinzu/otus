import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    operations: [],
    time: 0,
    level: 0, 
    correctAnswers: 0,
    Tries: 1
  },
  // plugins: [createPersistedState()],
  mutations: {
    setTime(store, payload) {
      store.time = payload.amount
    },
    setLevel(store, payload) {
      store.level = payload.amount
    },
    setOperations(store, payload) {
      store.operations = payload.amount
    },
    setTries(store, payload) {
      store.Tries = payload.amount
    },
    setcorrectAnswers(store, payload) {
      store.correctAnswers = payload.amount
    }
  }
})
