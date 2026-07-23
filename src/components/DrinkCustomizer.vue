<template>
    <transition name="fade" appear>
        <div id="card" class="bg-white p-6 rounded-2xl shadow-sm">
            <div class="grid grid-rows-2 gap-4 mb-4"
                style="grid-template-columns: 1fr 1.5fr .5fr; grid-template-rows: 48px auto;">
                <div class="flex items-center justify-start">
                    <button @click="closeCustomizer" aria-label="Back" class="cursor-pointer">
                        <IconArrowLeftOutline color="#FF7FB1" class="inline icon-thin" height="48" width="48" />
                    </button>
                </div>
                <div class="flex items-center">
                    <h3 class="text-xl font-medium text-text-accent whitespace-nowrap">Customize Drink</h3>
                </div>
                <div></div>
                <div class="rounded-lg">
                    <img :src="item.image" :alt="item.name" class="w-full h-auto rounded-lg" />
                </div>
                <div class="flex flex-col mt-2">
                    <span class="text-xl font-semibold mb-2 whitespace-nowrap">{{ item.name }}</span>
                    <p class="drink-description">{{ item.description }}</p>
                </div>
            </div>
            <div class="space-y-4">
                <hr class="border-text-accent" />
                <label class="block text-lg font-medium mb-4 text-text-accent">Size</label>
                <div class="flex w-full gap-2">
                    <button v-for="sizeOption in optionsMap.size" :key="sizeOption.name"
                        @click="customizedItem.size = sizeOption.name"
                        :class="{ active: sizeOption.name === customizedItem.size }"
                        class="flex-1 border-button-primary border rounded-xl p-2 cursor-pointer hover:bg-button-primary">
                        <label :for="sizeOption.name" class="text-gray-700 block cursor-pointer">{{ sizeOption.name
                            }}</label>
                        <label :for="sizeOption.name" class="text-gray-700 block cursor-pointer">${{
                            sizeOption.priceAdjustment.toFixed(2) }}</label>

                    </button>
                </div>
                <label class="block text-lg font-medium mb-4 text-text-accent">Temperature</label>
                <div class="flex w-full gap-2">
                    <button v-for="temperature in optionsMap.temperature" :key="temperature.name"
                        @click="customizedItem.temperature = temperature.name"
                        :class="{ active: temperature.name === customizedItem.temperature }"
                        class="flex-1 border-button-primary border rounded-xl p-2 cursor-pointer hover:bg-button-primary">
                        <label :for="temperature.name" class="text-gray-700 block cursor-pointer">{{ temperature.name
                            }}</label>
                        <label :for="temperature.name" class="text-gray-700 block cursor-pointer">${{
                            temperature.priceAdjustment.toFixed(2)
                            }}</label>

                    </button>
                </div>
                <label class="block text-lg font-medium mb-4 text-text-accent">Milk</label>
                <div class="flex w-full gap-2">
                    <button :class="{ active: milk.name === customizedItem.milk }" v-for="milk in optionsMap.milk"
                        :key="milk.name" @click="customizedItem.milk = milk.name"
                        class="flex-1 border-button-primary border rounded-xl p-2 cursor-pointer hover:bg-button-primary">
                        <label :for="milk.name" class="text-gray-700 block cursor-pointer">{{ milk.name }}</label>
                        <label :for="milk.name" class="text-gray-700 block cursor-pointer">${{
                            milk.priceAdjustment.toFixed(2) }}</label>

                    </button>
                </div>
            </div>
            <button @click="addToCart"
                class="flex items-center justify-between gap-2 bg-button-primary text-white mt-3 rounded-2xl py-3 px-6 w-full shadow-md cursor-pointer">
                <div class="flex items-center w-1/3">
                    <div class="relative mr-5">
                        <IconCartOutline class="icon-thin" height="36" width="36" />
                    </div>
                    <span class="text-nowrap">Add to Cart</span>
                </div>
                <div class="flex items-center justify-end w-1/3">
                    <span class="drink-price">{{ new Intl.NumberFormat('en-US', {
                        style: 'currency', currency: 'USD'
                    }).format(item.price) }}</span>
                </div>
            </button>
        </div>
    </transition>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { IconCartOutline, IconArrowLeftOutline } from '@iconify-prerendered/vue-flowbite'
import { useCartStore } from '@/store/cart'
const { item } = defineProps({
    item: {
        type: Object,
        required: true
    }
})
const store = useCartStore();
const emit = defineEmits(['close'])
const customizedItem = reactive({
    ...item,
    size: item.size ?? 'Medium',
    temperature: item.temperature ?? 'Iced',
    quantity: item.quantity || 1,
    milk: item.milk ?? 'Whole Milk',
    flavors: item.flavors ? [...item.flavors] : [],
    extras: item.extras ? [...item.extras] : []
})

watch(
    () => item,
    (newItem) => {
        Object.assign(customizedItem, {
            ...newItem,
            size: newItem.size ?? 'Medium',
            temperature: newItem.temperature ?? 'Iced',
            milk: newItem.milk ?? 'Whole Milk',
            flavors: newItem.flavors ? [...newItem.flavors] : [],
            extras: newItem.extras ? [...newItem.extras] : []
        })
    },
    { immediate: true, deep: true }
)
function closeCustomizer() {
    emit('close')
}

// Each addition can have a priceAdjustment that adds to the final total

const optionsMap = {
    size: [{ priceAdjustment: -0.75, name: 'Small' },
    { priceAdjustment: 0, name: 'Medium' },
    { priceAdjustment: 0.75, name: 'Large' }],
    temperature: [{ priceAdjustment: 0, name: 'Hot' },
    { priceAdjustment: 0, name: 'Iced' }],
    milk: [{ priceAdjustment: 0.0, name: 'Whole Milk' },
    { priceAdjustment: 0.0, name: 'Oat Milk' },
    { priceAdjustment: 0.0, name: 'Almond Milk' }],
    flavors: [{ priceAdjustment: 0.0, name: 'Vanilla' },
    { priceAdjustment: 0.0, name: 'Caramel' },
    { priceAdjustment: 0.0, name: 'Hazelnut' },
    { priceAdjustment: 0.0, name: 'Mocha' },
    { priceAdjustment: 0.0, name: 'Pumpkin Spice' },
    { priceAdjustment: 0.0, name: 'Peppermint' }],
    extras: [{ priceAdjustment: 0.0, name: 'Whipped Cream' },
    { priceAdjustment: 1.50, name: 'Extra Shot' },
    { priceAdjustment: 0.0, name: 'Cinnamon' },
    { priceAdjustment: 0.0, name: 'Cold Foam' },
    { priceAdjustment: 0.0, name: 'Chocolate Drizzle' },
    { priceAdjustment: 0.0, name: 'Caramel Drizzle' }]
}
function addToCart() {
    store.addItem(customizedItem)
    closeCustomizer()
}
</script>


<style scoped>
@reference "../styles/style.css";
/* Adjust the path as necessary */

.active {
    background-color: var(--color-button-primary);
}

.active label {
    color: white;
}
</style>