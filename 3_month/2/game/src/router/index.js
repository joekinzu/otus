import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage'
import GamePage from '../components/GamePage'
import Stats from '../components/Stats'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
});
