import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomePage from '@/views/HomePage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import CatalogPage from '@/views/CatalogPage.vue';
import countryPage from '@/views/admin/countryPage.vue';
import hotelPage from '@/views/admin/hotelPage.vue';
import ticketPage from '@/views/admin/ticketPage.vue';
import tourPage from '@/views/admin/tourPage.vue';
import tourOperatorPage from '@/views/admin/tourOperatorPage.vue';
import itemPage from '@/views/itemPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {requireAuth: true},
      component: ProfilePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage
    },
    {
      path: '/catalog/:id',
      name: 'item',
      component: itemPage
    },
    {
      path: '/add-country',
      name: 'addCountry',
      beforeEnter: checkRole,
      meta: {requireAuth: true},
      component: countryPage
    },
    {
      path: '/add-hotel',
      name: 'addHotel',
      beforeEnter: checkRole,
      meta: {requireAuth: true},
      component: hotelPage
    },
    {
      path: '/add-operator',
      name: 'addOperator',
      beforeEnter: checkRole,
      meta: {requireAuth: true},
      component: tourOperatorPage
    },
    {
      path: '/add-ticket',
      name: 'addTicket',
      beforeEnter: checkRole,
      meta: {requireAuth: true},
      component: ticketPage
    },
    {
      path: '/add-tour',
      name: 'addTour',
      beforeEnter: checkRole,
      meta: {requireAuth: true},
      component: tourPage
    }
  ]
})

async function checkRole(to, from, next) { 
  await store.dispatch('GET_USER')
  if(store.getters.isAdmin) {
      next();       
  } else {
      next('/');
  }
}


router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth && !store.state.user.token) {
    next({name: 'login'});
  } else if(store.state.user.token && (to.name == 'login' || to.name == 'register')){
    next({name: 'home'});
  } else {
    next();
  }
})

export default router
