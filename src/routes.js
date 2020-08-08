import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from '@pages/index.vue';
import Login from '@pages/login/index.vue';
import Contacts from '@pages/contacts/index.vue';
const routes = [
  {
    path: '/',
    name: 'main',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts
  }
];

export const router = new VueRouter({
  routes,
  mode: 'history'
});