<template>
  <div class="gutter-container">
    <Header top-text="Welcome To" bottom-text="Coffee Cart!" />
    <div class="flex flex-col items-center">
      <div class="flex flex-col text-text-secondary my-4">
        <p class="text-foreground-secondary font-semibold text-center">Your favorite drinks, made with love.</p>
        <button @click="orderNow" class="my-4 bg-button-primary text-light cursor-pointer rounded-2xl text-2xl py-2">
          Order Now
        </button>
        <p class="text-foreground-secondary font-semibold text-center">Order ahead and skip the line!</p>
      </div>
      <div class="flex flex-row justify-between gap-4 w-full">
        <div class="bg-white p-4 rounded-2xl shadow w-2/3">
          <h2 class="text-2xl font-bold mb-2 text-primary">Find Our Coffee</h2>
          <ul class="list-disc list-inside mb-4 locations">
            <li>Riverside Arts Market</li>
            <li>Riverside Flea Market</li>
            <li>Ya Mammas House</li>
            <li>Placeholder</li>
            <li>Placeholder</li>
          </ul>
        </div>
        <div class="w-1/3 my-auto mx-0">
          <fwb-img :src="coffeeCartImg" alt="Coffee Cart" />
        </div>

      </div>
      <Menu seasonalOnly />
      <button @click="orderNow" class="my-4 bg-button-primary text-black cursor-pointer rounded-2xl py-2 px-6 text-2xl">
        Contact Us
      </button>
      <div class="flex gap-5">
        <fwb-img :src="mericaImg" alt="Merica, the owner" class="mt-4 w-64 h-auto" />
        <p>My name is Merica Andrews and this is my coffee cart, _______. Insert personal statement/anecdote, why she
          started the business. Mission statement of the business. Platitude and call to action for the customer.</p>
      </div>

      Thanks for visiting!
    </div>
  </div>

</template>

<script setup>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import mericaImg from '@/assets/png/merica.jpg';
import coffeeCartImg from '@/assets/png/coffee-cart.png';
import { FwbImg } from 'flowbite-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function orderNow() {
  router.push('/order');
}

</script>

<style scoped>
.gutter-container {
  max-width: 100%;
  margin: 0 auto;
}

ul.locations li {
  list-style: none;

  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

ul.locations li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 18px;
  height: 18px;
  background: var(--color-primary);

  -webkit-mask: url("../assets/svg/pin-icon.svg") center / contain no-repeat;
  mask: url("../assets/svg/pin-icon.svg") center / contain no-repeat;
}
</style>