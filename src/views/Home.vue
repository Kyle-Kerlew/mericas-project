<template>
  <div class="flex flex-col items-center">
    <!-- Hero Section -->
    <section class="hero-section w-full">
      <div class="flex lg:flex-row gap-8 lg:gap-12 items-center">
        <!-- Left Content -->
        <div class="flex-1 flex flex-col gap-3 lg:gap-6">
          <div>
            <p class="text-primary font-semibold text-sm md:text-base tracking-wide uppercase mb-4">SIP. SMILE. BE
              YOUR OWN MAIN CHARACTER.</p>
            <h1 class="text-3xl lg:text-5xl xl:text-6xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Coffee made with <span
                class="text-primary italic font-cursive text-4xl sm:text-4xl md:text-5xl navigation-mobile:text-6xl">love,</span>
              served in
              <span
                class="text-primary italic font-cursive text-4xl sm:text-4xl md:text-5xl navigation-mobile:text-6xl">Jacksonville.</span>
            </h1>
          </div>
          <p class="text-base md:text-lg text-foreground-secondary leading-relaxed">
            Find {{ siteName }} at local markets, pop-ups, and events around Jax. Order ahead and we'll have your
            favorite drink ready to go!
          </p>
          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button @click="orderNow"
              class="flex items-center justify-center gap-2 bg-primary text-white px-4 navigation-mobile:px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition-colors cursor-pointer">
              <IconHeartSolid width="22" height="22" />
              Order Ahead
            </button>
            <button @click="viewSchedule"
              class="flex items-center justify-center gap-2 border-2 border-primary text-primary px-4 navigation-mobile:px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <IconCalendarMonthOutline width="22" height="22" />
              View Schedule
            </button>
          </div>
        </div>
        <div>
          <div class="rounded-3xl navigation-mobile:p-8 flex items-center justify-center flex-col h-full">
            <Logo name="hero-icon" class="h-50 xs:h-60 xs:h-90 object-contain mb-4" />
            <span
              class="font-cursive text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-primary brand-name">{{
                siteName }}</span>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div id="locations" class="p-6 flex flex-col items-center justify-center w-full">
        <div class="section-heading">
          <h2 class="text-3xl font-semibold text-primary">Find Our Coffee</h2>
        </div>
        <div
          class="flex items-center justify-center w-full mb-4 before:ml-3.75 before:mr-1 before:flex-1 before:border-b before:border-primary after:flex-1 after:border-b after:border-primary after:mr-3.75 after:ml-1">
          <IconHeartSolid class="text-primary" width="16" height="16" />
        </div>
        <div id="next-stop" class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start w-full max-w-6xl mb-8">
          <div class="rounded-3xl overflow-hidden bg-slate-100 shadow-sm h-[320px] sm:h-[420px]">
            <iframe class="w-full h-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Riverside%20Arts%20Market%20Jacksonville%20FL&z=15&output=embed"
              title="Riverside Arts Market - Jacksonville, FL"></iframe>
          </div>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

              <div class="flex-1 ml-5 mb-4">
                <h3 class="text-primary text-xl uppercase font-semibold mb-4">next stop</h3>
                <span class="text-lg font-bold mb-2 block">Riverside Arts Market</span>
                <span class="text-primary font-bold mb-2 block">Sat, July 25 &#8226; 10AM - 3PM</span>
                <span class="text-sm">715 Riverside Ave, Jacksonville, FL.</span>
              </div>
            </div>
            <div>
              <h2 class="text-primary uppercase font-semibold text-xl mb-3">Also Find Us At</h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 locations text-foreground-secondary">
                <li>Riverside Arts Market</li>
                <li>Riverside Flea Market</li>
                <li>Ya Mammas House</li>
                <li>Really Free Market</li>
                <li>Bayard Antique Market</li>
              </ul>
            </div>
            <button @click="viewSchedule"
              class="flex gap-2 justify-center items-center border border-primary rounded-2xl text-primary py-2 px-6 text-lg font-semibold duration-300 ease-in-out hover:bg-primary-hover hover:text-light cursor-pointer w-full sm:w-auto">
              <IconCalendarMonthOutline width="22" height="22" />
              <div>
                View Schedule
              </div>
            </button>
          </div>
        </div>
      </div>
      <Menu seasonalOnly />
    </div>
    <div class="flex flex-col md:flex-row gap-5 md:gap-6 my-6 items-start md:items-center">
      <fwb-img :src="mericaImg" alt="Merica, the owner" class="w-full md:w-82 h-auto rounded-2xl object-contain" />
      <div class="w-full">
        <h1 class="text-primary text-3xl font-bold mb-3">Meet Merica</h1>
        <p class="text-foreground-secondary max-w-2xl mb-3">My name is Merica Andrews and this is my coffee cart, {{
          siteName }}. I
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
  padding-top: 4rem;
  padding-bottom: 2rem;
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

.section-heading {
  display: grid;
  grid-template-rows: 3rem auto;
  justify-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
}

@media (max-width: 640px) {
  .hero-section {
    padding-top: 2rem;
  }
}

.section-heading-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
