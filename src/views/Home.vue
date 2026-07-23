<template>
  <div class="gutter-container">
    <div class="flex flex-col items-center">
      <!-- Hero Section -->
      <section class="hero-section w-full">
        <div class="flex lg:flex-row gap-8 lg:gap-12 items-center">
          <!-- Left Content -->
          <div class="flex-1 flex flex-col gap-6">
            <div>
              <p class="text-primary font-semibold text-sm md:text-base tracking-wide uppercase mb-4">SIP. SMILE. BE
                YOUR OWN MAIN CHARACTER.</p>
              <h1 class="lg:text-5xl xl:text-6xl md:text-5xl font-bold leading-tight text-foreground mb-4">
                Coffee made with <span class="text-primary italic font-cursive">love,</span> served around <span
                  class="text-primary italic font-cursive">Jacksonville.</span>
              </h1>
            </div>
            <p class="text-base md:text-lg text-foreground-secondary leading-relaxed">
              Find {{ siteName }} at local markets, pop-ups, and events around Jax. Order ahead and we'll have your
              favorite drink ready to go!
            </p>
            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button @click="orderNow"
                class="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors cursor-pointer">
                <IconHeartSolid width="22" height="22" />
                Order Ahead
              </button>
              <button @click="viewSchedule"
                class="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <IconCalendarMonthOutline width="22" height="22" />
                View Schedule
              </button>
            </div>
          </div>
          <div class="flex-1 w-full">
            <div class="rounded-3xl p-8 flex items-center justify-center flex-col h-full">
              <Logo name="hero-icon" class="xs:h-60 h-90 object-contain mb-4" />
              <span
                class="font-cursive sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-primary brand-name">{{
                  siteName }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="flex">

        <Menu seasonalOnly />
        <div>
          <div id="locations" class="bg-background-alt-card p-6 rounded-2xl shadow-sm">
            <h2 class="text-2xl font-semibold mb-6 text-primary">Find Our Coffee</h2>
            <ul class="list-disc list-inside mb-4 locations text-foreground-secondary">
              <li>Riverside Arts Market</li>
              <li>Riverside Flea Market</li>
              <li>Ya Mammas House</li>
              <li>Really Free Market</li>
              <li>Placeholder</li>
            </ul>
            <button @click="viewSchedule"
              class="border border-primary rounded-2xl text-primary py-2 px-6 text-lg font-semibold duration-300 ease-in-out hover:bg-primary-hover hover:text-light cursor-pointer">
              <IconCalendarMonthOutline width="22" height="22" /> View Schedule
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-5 md:gap-6 my-6 items-start md:items-center">
        <fwb-img :src="mericaImg" alt="Merica, the owner" class="w-full md:w-82 h-auto rounded-2xl object-contain" />
        <div class="w-full">
          <h1 class="text-primary text-xl font-bold mb-3">Meet Merica</h1>
          <p class="text-foreground-secondary">My name is Merica Andrews and this is my coffee cart, {{ siteName }}. I
            started this business with a simple mission: to serve high-quality drinks with a whole lot of heart.</p>
          <p class="text-foreground-secondary">Thank you for supporting a small, local business. I can't wait to serve
            you!</p>
          <button @click="orderNow"
            class="my-4 border border-primary text-primary cursor-pointer rounded-2xl py-2 px-6 text-lg font-semibold duration-300 ease-in-out hover:bg-primary-hover hover:text-light">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Menu from '@/components/Menu.vue';
import mericaImg from '@/assets/png/merica.jpg';
import { IconHeartSolid, IconCalendarMonthOutline } from '@iconify-prerendered/vue-flowbite'
import { siteName } from '@/config/site';
import { FwbImg } from 'flowbite-vue';
import { useRouter } from 'vue-router';
import Logo from "../components/svg/Logo.vue";
const router = useRouter();

function orderNow() {
  router.push('/order');
}

function viewSchedule() {
  const section = document.getElementById('locations');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<style scoped>
.gutter-container {
  max-width: 100%;
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

.brand-name {
  position: relative;
  display: inline-block;
  font-family: "Sacramento", cursive;
  line-height: 1;

}

.brand-name::after {
  content: "";
  position: absolute;
  left: 25%;
  right: 25%;
  bottom: -0.35rem;
  height: 0.35rem;
  width: 50%;
  background: var(--color-primary);
  border-radius: 73% 73% 73% 73%;
  transform: rotate(-2deg) scaleY(.45);
  transform-origin: center;
}

ul.locations li {
  list-style: none;

  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.hero-section {
  padding: 2rem 0;
}

.font-cursive {
  font-family: var(--font-cursive);
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