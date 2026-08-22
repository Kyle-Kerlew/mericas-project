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
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // Optional: for smooth scrolling
      };
    }
    return { top: 0 }; // Scroll to top for other navigations
  }
});

// Helper to smooth-scroll to a hash selector
function smoothScrollToHash(hash) {
  try {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { el.focus({ preventScroll: true }); } catch (e) {}
    }
  } catch (e) {
    // ignore
  }
}

// If navigating to the same route but with a different hash, trigger smooth scroll
router.afterEach((to, from) => {
  if (to.hash && to.path === from.path) {
    setTimeout(() => smoothScrollToHash(to.hash), 0);
  }
});

// Intercept same-page anchor clicks (href="#...") to perform smooth scroll
if (typeof window !== 'undefined') {
  document.addEventListener('click', (event) => {
    const a = event.target.closest && event.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      const hash = href;
      event.preventDefault();
      history.pushState(null, '', hash);
      smoothScrollToHash(hash);
      return;
    }
    try {
      const url = new URL(a.href);
      if (url.pathname === location.pathname && url.hash) {
        event.preventDefault();
        history.pushState(null, '', url.hash);
        smoothScrollToHash(url.hash);
      }
    } catch (e) {
      // ignore
    }
  });
}

export default router;