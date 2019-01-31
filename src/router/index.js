import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Users from '@/views/users/Users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/', name: 'Home', component: Home },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/users', name: 'Users', component: Users }
      ]
    }
  ]
})
