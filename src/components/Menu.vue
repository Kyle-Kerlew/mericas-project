<template>
    <div v-if="showCustomizer">
        <DrinkCustomizer :item="selectedItem" @close="closeCustomizer" />
    </div>
    <transition v-else name="fade" appear>
        <div class="flex justify-center gap-5 pt-3 sm:pt-6 sm:px-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-5xl mx-auto">
            <div id="featured" :class="['w-full sm:max-w-[80vw] rounded-3xl', seasonalOnly ? 'my-0' : 'my-6']">
                <div class="menu-heading text-center px-8 rounded-t-2xl">
                    <div class="section-heading-eyebrow"> 
                        <h2 class="font-cursive! text-3xl text-primary">Made With Love</h2>
                    </div>
                    <h2 class="text-4xl font-semibold mb-2">
                        {{ seasonalOnly ? siteName + ' Favorites' : 'Menu' }}
                    </h2>
                    <span class="mb-2">Our most loved drinks, made just for you</span>
                    <IconHeartSolid class="text-primary" width="22" height="22" />
                </div>
                <div class="py-3 sm:px-6">
                    <div class="grid grid-cols-1 gap-y-8 gap-x-2 navigation-mobile:grid-cols-2">
                        <div v-for="item in visibleItems" :key="item.name">
                            <div class="grid grid-cols-[100px_minmax(120px,_1fr)_100px]">
                                <div>
                                    <div class="image-plate">
                                        <img :src="item.image" :alt="item.name"
                                            class="rounded-full h-20 w-20 object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg">{{ item.name }}</h3>
                                    <p>{{ item.description }}</p>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <span class="text-primary font-bold">{{ new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(item.price) }}</span>
                                    <button @click="selectDrink(item)" class="add-btn"
                                        aria-label="Add {{ item.name }}">
                                        <IconPlusOutline width="20" height="20" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pt-5">
                        <button v-if="seasonalOnly" @click="orderNow"
                            class="flex justify-center items-center px-8 py-3 gap-2 font-semibold my-2 bg-button-primary text-light cursor-pointer rounded-full duration-300 ease-in-out hover:bg-primary-hover">
                            <IconHeartSolid width="22" height="22" />
                            View Full Menu
                        </button>

                    </div>
                </div>
                <div class="flex justify-center">

                    <button v-if="!seasonalOnly" @click="openCart"
                        class="flex items-center justify-between gap-2 bg-primary text-white my-3 rounded-full py-3 px-6 w-full md:w-[65%] shadow-md cursor-pointer">
                        <div class="flex items-center w-1/3">
                            <div class="relative mr-5">
                                <IconCartOutline class="icon-thin" height="36" width="36" />
                                <span
                                    class="icon-item-count text-sm bg-white text-pink-600 w-5 h-5 flex justify-center items-center rounded-full">{{
                                        cartItemCount }}</span>
                            </div>
                            <span class="text-nowrap">View Cart</span>
                        </div>
                        <div>
                            <div class="vertical-separator" />
                        </div>
                        <div class="flex items-center justify-end w-1/3">
                            <span>Total: {{ new Intl.NumberFormat('en-US', {
                                style: 'currency', currency: 'USD'
                            }).format(cartItemCost) }}</span>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    </transition>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useCartStore } from '@/store/cart'
import DrinkCustomizer from '@/components/DrinkCustomizer.vue'
import { IconPlusOutline, IconCartOutline, IconHeartSolid } from '@iconify-prerendered/vue-flowbite'
import { useRoute, useRouter } from 'vue-router'
import { siteName } from '@/config/site';
const props = defineProps({
    seasonalOnly: {
        type: Boolean,
        default: false
    }
})
const router = useRouter();
const route = useRoute();
const cart = useCartStore()
const showCustomizer = ref(false)
const selectedItem = ref(null)

const openCustomizer = (item) => {
    selectedItem.value = item
    showCustomizer.value = true
}

const closeCustomizer = () => {
    selectedItem.value = null
    showCustomizer.value = false

    if (route.query.drink) {
        const { drink, ...query } = route.query
        router.replace({ query })
    }
}

const selectDrink = (item) => {
    if (props.seasonalOnly) {
        router.push({ name: 'Order', query: { drink: item.name } })
        return
    }

    openCustomizer(item)
}

function openCart() {
    router.push('/cart');
}

const menuItems = [
    { name: 'My Man', description: 'Rich and bold espresso shot with a side of wink wink ;) 😏😏😏.', price: 4.75, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Blueberry Cobbler Chai', description: 'Classic Chai with blueberry Cobbler Flavor and a Touch of Warm Spices', price: 6.50, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Caramel Macchiato', description: 'Caramel and vanilla with a cloud of foam and a drizzle of golden goodness.', price: 5.00, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Vanilla Latte', description: 'Smooth espresso with vanilla and and steamed milk. Simple, classic, and comforting.', price: 4.50, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" }
]

const visibleItems = computed(() => {
    return props.seasonalOnly ? menuItems.filter(item => item.seasonal) : menuItems
})

watch(
    () => route.query.drink,
    (drinkName) => {
        if (!drinkName || props.seasonalOnly) return

        const item = menuItems.find(menuItem => menuItem.name === drinkName)
        if (item) openCustomizer(item)
    },
    { immediate: true }
)

const cartItemCount = computed(() => {
    return cart.totalItems;
})
const cartItemCost = computed(() => {
    return cart.totalPrice
})
function orderNow() {
    router.push('/order');
}
</script>

<style scoped>
@reference "../styles/style.css";

.icon-item-count {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(35%, -35%);
    font-size: 0.75rem;
    line-height: 1;
}

.vertical-separator {
    height: 35px;
    border-right: 1px solid white;
}

:deep(.icon-thin path) {
    stroke-width: 1px !important;
}

.custom-grid {
    display: grid;
    grid-template-columns: 144px minmax(0, 1fr) .75fr;
    gap: 1.5rem;
    align-items: stretch;
}

.custom-grid>* {
    min-width: 0;
}

.drink-list>li {
    margin-bottom: .75rem;
}

.menu-heading {
    display: grid;
    grid-template-rows: 3rem auto auto auto;
    justify-items: center;
    padding-bottom: 0.75rem;
}

.section-heading-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-plate {
    background: #FFE9C9;
    border-radius: 50%;
    width: 84px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.03) inset;
}

.add-btn {
    background: #d93b6a;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

@media (max-width: 768px) {
    .menu-grid {
        grid-template-columns: 1fr;
    }
}
</style>
