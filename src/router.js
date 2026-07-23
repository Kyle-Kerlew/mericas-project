import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
  { path: '/order', name: 'Order', component: () => import('./views/Order.vue') },
  { path: '/cart', name: 'Cart', component: () => import('./views/Cart.vue') },
  { path: '/order-confirmation', name: 'OrderConfirmation', component: () => import('./views/OrderConfirmation.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;