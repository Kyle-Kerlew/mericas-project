<template>
  <nav>
    <header class="relative top-0 z-50 flex items-center justify-center w-full overflow-visible h-[130px]">
      <img class="absolute inset-0 w-full object-cover h-full" src="../assets/svg/awning.svg" aria-hidden="true"
        alt="" />

      <div class="relative z-10 mx-auto w-[min(100%-2rem,90rem)]">
        <div class="relative rounded-full bg-white/95 shadow-sm sm:px-6 py-3">
          <div
            class="flex items-center justify-between gap-4 xs:grid xs:grid-cols-[auto_auto_1fr] navigation-mobile:grid-cols-[1fr_auto_1fr] navigation-mobile:items-center">
            <a href="/"
              class="inline-flex items-center whitespace-nowrap gap-3 rounded-full px-4 py-1 text-primary site-name transition navigation-mobile:w-auto">
              <Logo className="h-12 w-12 mr-2 hidden md:block" name="navigation-logo" />
              <span class="text-4xl sm:text-5xl block h-9"> {{ siteName }}</span>
            </a>

            <nav aria-label="Primary navigation"
              class="hidden items-center justify-center gap-3 px-4 py-2 navigation-mobile:flex navigation-mobile:gap-10">
              <a href="/#locations"
                class="font-semibold text-foreground no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Find Us
              </a>

              <a href="/order"
                class="font-semibold text-foreground no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Menu
              </a>

              <a href="/#about"
                class="font-semibold text-foreground no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                About
              </a>

              <a href="/#contact"
                class="font-semibold text-foreground no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Contact
              </a>
            </nav>

            <div class="flex items-center justify-end gap-2 navigation-mobile:justify-self-end">
              <a v-if="route.path === '/' && cartItemCount === 0" href="/order"
                class="hidden rounded-full bg-primary px-6 py-2 gap-2 text-primary-foreground text-center no-underline shadow-sm transition hover:bg-primary-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 navigation-mobile:inline-flex justify-center">
                <div>
                  <IconHeartSolid width="22" height="22" />
                  <span>Order Ahead</span>
                </div>
              </a>
              <button v-else @click="goToCart"
                class="relative cursor-pointer hidden rounded-full bg-primary px-5 py-3 gap-3 text-md text-primary-foreground text-center no-underline shadow-sm transition hover:bg-primary-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 navigation-mobile:flex justify-center items-center">
                <span class="relative">
                  <IconCartOutline class="icon-thin" width="28" height="28" />
                  <span
                    class="cart-item-count text-sm bg-white text-pink-600 min-w-4 h-5 px-1 flex justify-center items-center rounded-full whitespace-nowrap">{{
                      cartItemCount }}</span>
                </span>
                View Cart
              </button>

              <button type="button" @click="menuOpen = !menuOpen" aria-label="Toggle navigation"
                class="cursor-pointer inline-flex h-11 w-11 items-center justify-center mr-2 rounded-full text-foreground navigation-mobile:hidden">
                <IconBarsOutline width="28" height="28" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <transition name="slide-right">
        <div v-if="menuOpen" class="fixed inset-0 z-50 navigation-mobile:hidden">
          <button type="button" @click="menuOpen = false" class="absolute inset-0 bg-slate-950/30"
            aria-label="Close menu"></button>
          <div
            class="absolute inset-y-0 right-0 w-[80vw] max-w-xs overflow-hidden rounded-l-3xl bg-white p-4 shadow-2xl">

            <div class="mb-6 flex items-center justify-between">
              <a href="/" @click="menuOpen = false" class="inline-flex items-center gap-2 text-primary no-underline">
                <Logo className="h-12 w-7" name="mobile-menu-logo" />
                <span class="site-name text-3xl">{{ siteName }}</span>
              </a>
              <button type="button" @click="menuOpen = false"
                class="cursor-pointer h-8 w-8 inline-flex items-center justify-center rounded-full bg-primary p-2 text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close menu">
                x
              </button>
            </div>

            <a href="/#locations" @click="menuOpen = false"
              class="flex items-center gap-4 rounded-2xl px-4 py-3 font-semibold text-foreground transition-colors hover:bg-slate-100">
              <IconMapPinAltSolid class="text-primary" width="28" height="28" />
              Find Us
            </a>
            <a href="/order" @click="menuOpen = false"
              class="mt-2 flex items-center gap-4 rounded-2xl px-4 py-3 font-semibold text-foreground transition-colors hover:bg-slate-100">
              <IconStoreSolid class="text-primary" width="28" height="28" />
              Menu
            </a>
            <a href="/#about" @click="menuOpen = false"
              class="mt-2 flex items-center gap-4 rounded-2xl px-4 py-3 font-semibold text-foreground transition-colors hover:bg-slate-100">
              <IconHeartSolid class="text-primary" width="28" height="28" />
              About
            </a>
            <a href="/#contact" @click="menuOpen = false"
              class="mt-2 flex items-center gap-4 rounded-2xl px-4 py-3 font-semibold text-foreground transition-colors hover:bg-slate-100">
              <IconEnvelopeSolid class="text-primary" width="28" height="28" />
              Contact
            </a>
            <a v-if="route.path === '/' && cartItemCount === 0" href="/order"
              class="cursor-pointer rounded-full bg-primary px-6 py-2 my-4 gap-2 text-primary-foreground text-center no-underline shadow-sm transition hover:bg-primary-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 inline-flex justify-center">
              <div>

                <IconHeartSolid width="22" height="22" />
                <span> Order Ahead</span>
              </div>

            </a>
            <button v-else @click="goToCart"
              class="flex items-center w-full font-semibold relative cursor-pointer rounded-full bg-primary px-5 py-3 my-4 gap-3 text-md text-primary-foreground text-center no-underline shadow-sm transition hover:bg-primary-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 justify-center">
              <span class="relative">
                <IconCartOutline class="icon-thin" width="28" height="28" />
                <span
                  class="cart-item-count text-sm bg-white text-pink-600 min-w-4 h-5 px-1 flex justify-center items-center rounded-full whitespace-nowrap">{{
                    cartItemCount }}</span>
              </span>
              View Cart
            </button>
          </div>
        </div>
      </transition>
    </header>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { siteName } from '@/config/site';
import {
  IconBarsOutline,
  IconHeartSolid,
  IconCartOutline,
  IconMapPinAltSolid,
  IconStoreSolid,
  IconEnvelopeSolid,
} from '@iconify-prerendered/vue-flowbite'
import Logo from './svg/Logo.vue';
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
const menuOpen = ref(false);
const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const cartItemCount = computed(() => cart.totalItems)
function goToCart() {
  router.push('/cart')
}
</script>

<style scoped>
header {
  min-height: 130px;
}

.site-name {
  width: auto;
  font-family: var(--font-cursive);
}

.cart-item-count {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1;
  transform: translate(40%, -40%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 220ms ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}

@media (max-width: 640px) {
  .site-nav-button {
    width: 100%;
  }
}
</style>
