import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
  ]
})

// function checkAdmin(to, from, next) { 
//   if(store.getters.isAdmin) {
//       next();       
//   } else {
//       next({ name: 'home'});
//   }
// }

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth && !store.state.token) {
//     next({name: 'login'});
//   } else if(store.state.token && (to.name == 'login' || to.name == 'register')){
//     next({name: 'home'});
//   } else {
//     next();
//   }
// })

export default router
