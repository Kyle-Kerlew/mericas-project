<template>
  <div>
    <Navigation/>
    <div class="gutter-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';
</script>

<style>
.gutter-container {
  width: min(100% - 1.5rem, 90rem);
  margin: 0 auto;
  padding: 0 0.75rem;
}

@media (min-width: 640px) {
  .gutter-container {
    padding: 0 1rem;
  }
}

@media (min-width: 768px) {
  .gutter-container {
    padding: 0;
  }
}
</style>