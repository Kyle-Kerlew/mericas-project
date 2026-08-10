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

      <div class="home-feature-grid">
        <div>
          <div id="locations" class="p-6 flex flex-col items-center justify-center w-full">
            <div class="section-heading">
              <h2 class="text-3xl font-semibold text-primary">Find Our Coffee</h2>
            </div>
            <div
              class="flex items-center justify-center w-full mb-4 before:ml-3.75 before:mr-1 before:flex-1 before:border-b before:border-primary after:flex-1 after:border-b after:border-primary after:mr-3.75 after:ml-1">
              <IconHeartSolid class="text-primary" width="16" height="16" />
            </div>
            <h3 class="text-primary text-xl uppercase font-semibold mb-4">next stop</h3>
            <div id="next-stop" class="location-copy-grid">
              <Logo class="h-26 w-auto" name="our-coffee-icon" />
              <div class="flex flex-col">
                <span class="text-lg font-bold mb-2">Riverside Arts Market</span>
                <span class=" text-primary font-bold mb-2">Sat, July 25 &#8226; 10AM - 3PM</span>
                <span class="text-sm">715 Riverside Ave, Jacksonville, FL.</span>
              </div>
              <h2 class="text-primary uppercase font-semibold text-xl mb-2">Also Find Us At </h2>
            </div>
            <ul class="self-start list-disc list-inside mb-4 locations text-foreground-secondary">
              <li>Riverside Arts Market</li>
              <li>Riverside Flea Market</li>
              <li>Ya Mammas House</li>
              <li>Really Free Market</li>
              <li>Placeholder</li>
            </ul>
            <button @click="viewSchedule"
              class="flex gap-2 justify-center items-center border border-primary rounded-2xl text-primary py-2 px-6 text-lg font-semibold duration-300 ease-in-out hover:bg-primary-hover hover:text-light cursor-pointer">
              <IconCalendarMonthOutline width="22" height="22" />
              <div>
                View Schedule
              </div>
            </button>
          </div>
        </div>
        <Menu seasonalOnly />
      </div>
      <div class="flex flex-col md:flex-row gap-5 md:gap-6 my-6 items-start md:items-center">
        <fwb-img :src="mericaImg" alt="Merica, the owner" class="w-full md:w-82 h-auto rounded-2xl object-contain" />
        <div class="w-full">
          <h1 class="text-primary text-3xl font-bold mb-3">Meet Merica</h1>
          <p class="text-foreground-secondary max-w-2xl mb-3">My name is Merica Andrews and this is my coffee cart, {{ siteName }}. I
            started this business with a simple mission: to serve high-quality drinks with a whole lot of heart.</p>
          <p class="text-xl text-primary font-bold">Thank you for supporting a small, local business. </p>
          <p class="text-primary-lighter text-[36px] font-cursive">I can't wait to serve you! &#9825;</p>
          <button @click="orderNow"
            class="flex gap-2 items-center my-4 border border-primary text-primary cursor-pointer rounded-2xl py-2 px-6 text-lg font-semibold duration-300 ease-in-out hover:bg-primary-hover hover:text-light">
            <IconEnvelopeSolid width="22" height="22" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Menu from '@/components/Menu.vue';
import mericaImg from '@/assets/png/merica.jpg';
import { IconHeartSolid, IconCalendarMonthOutline, IconEnvelopeSolid } from '@iconify-prerendered/vue-flowbite'
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
  padding-top: 2rem;
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

.home-feature-grid {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 4rem;
}

.section-heading {
  display: grid;
  grid-template-rows: 3rem auto;
  justify-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
}

.section-heading-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-copy-grid {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: start;
  width: 100%;
  margin-bottom: 0.75rem;
}

.location-copy-grid h2 {
  grid-column: 2;
}

@media (max-width: 1120px) {
  .home-feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
