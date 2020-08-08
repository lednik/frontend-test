import Vue from 'vue'
import App from './App.vue'

import { store } from './store';
import { router } from './routes';

// Директива v-click-outsid собитые при клике вне элемента
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';

Vue.directive('link', {
  // Когда привязанный элемент вставлен в DOM...
  bind: function (el, binding, vnode) {
    el.addEventListener('click', (e)=>{
      linkAction(e, el)
    })
  },
  unbind: function (el, binding, vnode) {
    el.removeEventListener('click', (e)=>{
      linkAction(e, el)
    })
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// создадим директиву, чтобы превращать обычную ссылку в <router-view></router-view>

// отменим дефолтное поведение ссылок и програмно вызовем роутинг
function linkAction(e, item) {
  e.preventDefault()
  if (item.getAttribute('to')) {
    router.push(item.getAttribute('to')).catch((err) => {});
  } else {
    let path = item.getAttribute('href');
    if (router.currentRoute.path !== path) {
      router.push(path).catch((err) => {});
    }
  }
}

