<template>
  <div class="app-shell">
    <Navigation/>
    <main class="gutter-container app-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';
</script>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
}

.gutter-container {
  width: min(100% - 1.5rem, 90rem);
  margin: 0 auto;
  padding: 0 0.75rem;
}

@media (max-width: 62.5rem) {
  .gutter-container {
    padding: 0 2rem !important;
    margin: 0;
    width: 100%;
  }
}
</style>