<template>
    <div v-if="showCustomizer">
        <DrinkCustomizer :item="selectedItem" @close="closeCustomizer" />
    </div>
    <transition v-else class="w-full" name="fade" appear>
        <div>
            <div class="bg-white shadow-sm rounded-full my-6">
                <div class="text-center px-8 py-3 rounded-t-2xl ">
                    <h2 class="text-2xl font-semibold text-primary">
                        {{ seasonalOnly ? 'Featured Items' : 'Menu' }}
                    </h2>
                </div>
                <div class="py-3 px-6">
                    <div v-for="item in visibleItems" :key="item.name" class="grid custom-grid py-2">
                        <div>
                            <img :src="item.image" :alt="item.name" class="rounded-full h-24" />
                        </div>
                        <div class="col-span-1 flex flex-col gap-2">
                            <h3 class="font-bold text-lg text-foreground-secondary">{{ item.name }}</h3>
                            <p class=" text-foreground-secondary">{{ item.description }}</p>
                        </div>
                        <div class="col-span-1 flex flex-col items-end gap-2">
                            <span class="drink-price text-primary font-semibold">{{ new Intl.NumberFormat('en-US', {
                                style: 'currency', currency:
                                    'USD'
                            }).format(item.price) }}</span>
                            <button @click="openCustomizer(item)"
                                class="flex items-center justify-center bg-background-alt duration-300 ease-in-out hover:bg-background-alt-hover text-primary rounded-full cursor-pointer w-9 h-9">
                                <IconPlusOutline class="font-bold" width="22" height="22"></IconPlusOutline>
                            </button>

                        </div>

                    </div>
                    <div class="flex justify-center">
                        <button v-if="seasonalOnly" @click="orderNow"
                            class="flex justify-center items-center px-8 py-3 gap-2 font-semibold my-2 bg-button-primary text-light cursor-pointer rounded-full duration-300 ease-in-out hover:bg-primary-hover">
                            <IconHeartSolid width="22" height="22" />
                            Order Now
                        </button>

                    </div>
                </div>

            </div>
            <button v-if="!seasonalOnly" @click="openCart"
                class="flex items-center justify-between gap-2 bg-primary text-white my-3 rounded-full py-3 px-6 w-full shadow-md cursor-pointer">
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
    </transition>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/store/cart'
import DrinkCustomizer from '@/components/DrinkCustomizer.vue'
import { IconPlusOutline, IconCartOutline, IconHeartSolid } from '@iconify-prerendered/vue-flowbite'
import { useRouter } from 'vue-router'
const props = defineProps({
    seasonalOnly: {
        type: Boolean,
        default: false
    }
})
const router = useRouter();
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
}

function openCart() {
    router.push('/cart');
}

const menuItems = [
    { name: 'My Man', description: 'Rich and bold espresso shot.', price: 1000000000.99, seasonal: false, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Blueberry Cobbler Chai', description: 'Classic Chai with blueberry Cobbler.', price: 6.50, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Caramel Macchiato', description: 'Espresso with caramel and milk.', price: 5.00, seasonal: false, image: "src/assets/png/BaddieBeanPlaceHolder.png" },
    { name: 'Vanilla Latte', description: 'Espresso with vanilla and milk.', price: 4.50, seasonal: true, image: "src/assets/png/BaddieBeanPlaceHolder.png" }
]

const visibleItems = computed(() => {
    return props.seasonalOnly ? menuItems.filter(item => item.seasonal) : menuItems
})

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
    grid-template-columns: 0.75fr 1.25fr 1fr;
}

.drink-list>li {
    margin-bottom: .75rem;
}
</style>