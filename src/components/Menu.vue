<template>
    <div v-if="showCustomizer">
        <DrinkCustomizer :item="selectedItem" @close="closeCustomizer" />
    </div>
    <transition v-else class="w-full" name="fade" appear>
        <div>
            <div class="text-center bg-card-header-primary px-8 py-3 rounded-t-2xl ">
                <h2 class="text-3xl font-semibold color-text-accent">
                    {{ seasonalOnly ? 'Featured Items' : 'Menu' }}
                </h2>
            </div>
            <div class="bg-white rounded-b-2xl py-8">
                <div class="drink-list">
                    <div v-for="item in visibleItems" :key="item.name" class="grid grid-cols-2 py-2">
                        <div class="col-span-1 flex flex-col gap-2">
                            <h3 class="font-bold text-lg">{{ item.name }}</h3>
                            <p class="drink-description">{{ item.description }}</p>
                        </div>
                        <div class="col-span-1 flex flex-col items-end gap-2">
                            <span class="drink-price">{{ new Intl.NumberFormat('en-US', {
                                style: 'currency', currency:
                                    'USD'
                            }).format(item.price) }}</span>
                            <button @click="openCustomizer(item)"
                                class="flex items-center justify-center bg-background text-text-accent rounded-full cursor-pointer w-9 h-9">
                                <IconPlusOutline class="font-bold" width="22" height="22"></IconPlusOutline>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="flex items-center justify-between gap-2 bg-pink-500 text-white mt-3 rounded-2xl py-3 px-6 w-full shadow-md cursor-pointer">
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
import { IconPlusOutline, IconCartOutline } from '@iconify-prerendered/vue-flowbite'

const props = defineProps({
    seasonalOnly: {
        type: Boolean,
        default: false
    }
})
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

.drink-list>li {
    margin-bottom: .75rem;
}

.drink-description {
    padding: 0 1.25rem;

}

.drink-list {
    padding: 0 1.25rem;
}
</style>