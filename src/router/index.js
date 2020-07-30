import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/pages/List.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
  },
  {
    path: '*', redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
