import Vue from 'vue';
import VueRouter from 'vue-router';

import authRoutes from '@/modules/auth/router';

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
/* webpackChunkName: "about" */
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...authRoutes, { path: '', redirect: '/login' }],
});
