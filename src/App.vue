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

@media (max-width: 62.5rem) {
  .gutter-container {
    padding: 0 2rem !important;
    margin: 0;
    width: 100%;
  }
}
</style>