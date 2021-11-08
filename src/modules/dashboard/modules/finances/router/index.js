const Records = () => import('./../views/Records.vue');

export default [
  {
    path: 'records',
    component: Records,
    meta: { requiresAuth: true },
    alias: ['home', ''],
  },
];
