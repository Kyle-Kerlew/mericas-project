<template>
    <div class="w-full sm:px-6 lg:px-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl mx-auto">
        <transition name="fade" appear>
            <div class="pb-4 rounded-2xl">
                <div class="grid gap-4 mb-4"
                    style="grid-template-columns: 1fr 1.5fr .5fr; grid-template-rows: 48px auto;">
                    <div class="flex items-center justify-start">
                        <button @click="closeCustomizer" aria-label="Back" class="cursor-pointer">
                            <IconArrowLeftOutline color="#FF7FB1" class="inline icon-thin" height="48" width="48" />
                        </button>
                    </div>
                    <div class="flex items-center">
                        <h3 class="text-xl font-medium text-foreground whitespace-nowrap">Customize Drink</h3>
                    </div>
                </div>
                <div class="flex gap-5 pb-3">
                    <div class="rounded-lg">
                        <img :src="item.image" :alt="item.name" class="max-w-32 drink-image h-auto rounded-lg" />
                    </div>
                    <div class="flex flex-col mt-2">
                        <span class="text-xl font-semibold mb-2 whitespace-nowrap text-foreground">{{ item.name }}</span>
                        <p class="drink-description text-foreground">{{ item.description }}</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <hr class="border-outline" />
                    <label class="block text-lg font-medium mb-4 text-foreground">Size</label>
                    <div class="flex w-full gap-2">
                        <button v-for="sizeOption in optionsMap.size" :key="sizeOption.name"
                            @click="customizedItem.size = sizeOption.name"
                            :class="{ active: sizeOption.name === customizedItem.size }"
                            class="flex-1 border-outline border rounded-xl p-2 cursor-pointer hover:bg-primary-hover hover:text-white text-foreground">
                            <label :for="sizeOption.name" class="block cursor-pointer">{{ sizeOption.name
                                }}</label>
                            <label :for="sizeOption.name" class="block cursor-pointer text-xs font-normal leading-tight">{{
                                Number(sizeOption.priceAdjustment) !== 0 ? ((sizeOption.priceAdjustment > 0 ? '+' : '−')
                                    + '$' + Math.abs(sizeOption.priceAdjustment).toFixed(2)) : '' }}</label>

                        </button>
                    </div>
                    <label class="block text-lg font-medium mb-4 text-foreground">Temperature</label>
                    <div class="flex w-full gap-2">
                        <button v-for="temperature in optionsMap.temperature" :key="temperature.name"
                            @click="customizedItem.temperature = temperature.name"
                            :class="{ active: temperature.name === customizedItem.temperature }"
                            class="flex-1 border-outline border rounded-xl p-2 cursor-pointer hover:bg-primary-hover hover:text-white text-foreground">
                            <label :for="temperature.name" class=" block cursor-pointer">{{ temperature.name
                                }}</label>
                            <label :for="temperature.name" class="block cursor-pointer text-xs font-normal leading-tight">{{
                                Number(temperature.priceAdjustment) !== 0 ? ((temperature.priceAdjustment > 0 ? '+' :
                                    '−') + '$' + Math.abs(temperature.priceAdjustment).toFixed(2)) : '' }}</label>

                        </button>
                    </div>
                    <label class="block text-lg font-medium mb-4 text-foreground">Milk</label>
                    <div class="flex w-full gap-2">
                        <button :class="{ active: milk.name === customizedItem.milk }" v-for="milk in optionsMap.milk"
                            :key="milk.name" @click="customizedItem.milk = milk.name"
                            class="flex-1 border-outline border rounded-xl p-2 cursor-pointer hover:bg-primary-hover hover:text-white text-foreground">
                            <label :for="milk.name" class=" block cursor-pointer">{{ milk.name }}</label>
                            <label :for="milk.name" class="block cursor-pointer text-xs font-normal leading-tight">{{ Number(milk.priceAdjustment) !== 0
                                ? ((milk.priceAdjustment > 0 ? '+' : '−') + '$' +
                                Math.abs(milk.priceAdjustment).toFixed(2)) : '' }}</label>

                        </button>
                    </div>
                    <label class="block text-lg font-medium mb-4 text-foreground" for="flavor-select">Flavors</label>
                    <div class="flavor-control flex w-full items-center gap-1">
                        <select id="flavor-select" v-model="customizedItem.flavor"
                            class="min-w-0 flex-1 border-0 bg-transparent p-2 text-foreground cursor-pointer focus:outline-none">
                            <option value="">No flavor</option>
                            <option v-for="flavor in optionsMap.flavors" :key="flavor" :value="flavor">
                                {{ flavor.split(' - ')[0] }}
                            </option>
                        </select>
                        <span v-if="customizedItem.flavor" class="flavor-separator" aria-hidden="true"></span>
                        <div v-if="customizedItem.flavor" class="pump-control flex items-center gap-2">
                            <button type="button" @click="decreaseFlavorPumps" :disabled="customizedItem.flavorPumps <= 1"
                                aria-label="Decrease syrup pumps">−</button>
                            <span>{{ customizedItem.flavorPumps }}</span>
                            <button type="button" @click="customizedItem.flavorPumps++" aria-label="Increase syrup pumps">+</button>
                        </div>
                    </div>
                </div>
                <button @click="addToCart"
                    class="flex items-center justify-between gap-2 bg-button-primary text-white mt-6 rounded-2xl py-3 px-6 w-full shadow-md cursor-pointer">
                    <div class="flex items-center w-1/3">
                        <div class="relative mr-5">
                            <IconCartOutline class="icon-thin" height="36" width="36" />
                        </div>
                        <span class="text-nowrap hover:bg-primary-hover">{{ isEdit ? 'Update Cart' : 'Add to Cart'
                            }}</span>
                    </div>
                    <div class="flex items-center justify-end w-1/3">
                        <span class="drink-price">{{ totalPriceFormatted }}</span>
                    </div>
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { IconCartOutline, IconArrowLeftOutline } from '@iconify-prerendered/vue-flowbite'
import { useCartStore } from '@/store/cart'
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    editIndex: {
        type: Number,
        default: null
    }
})
const item = props.item;
const isEdit = props.isEdit;
const store = useCartStore();
const emit = defineEmits(['close', 'update'])
const customizedItem = reactive({
    ...item,
    size: item.size ?? 'Medium',
    temperature: item.temperature ?? 'Iced',
    quantity: item.quantity || 1,
    milk: item.milk ?? 'Whole Milk',
    flavor: item.flavor ?? item.flavors?.[0] ?? '',
    flavorPumps: item.flavorPumps ?? 1,
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
            flavor: newItem.flavor ?? newItem.flavors?.[0] ?? '',
            flavorPumps: newItem.flavorPumps ?? 1,
            flavors: newItem.flavors ? [...newItem.flavors] : [],
            extras: newItem.extras ? [...newItem.extras] : []
        })
    },
    { immediate: true, deep: true }
)
function closeCustomizer() {
    emit('close')
}

// modal behavior removed: no scroll lock or Escape handling

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
    flavors: ['Vanilla - $0.50 per pump',
        'Caramel - $0.50 per pump',
        'Chocolate - $0.50 per pump',
        'Hazelnut - $0.50 per pump',
        'Mocha - $0.50 per pump',
        'Pumpkin Spice - $0.50 per pump',
        'Peppermint - $0.50 per pump'],
    extras: [{ priceAdjustment: 0.0, name: 'Whipped Cream' },
    { priceAdjustment: 1.50, name: 'Extra Shot' },
    { priceAdjustment: 0.0, name: 'Cinnamon' },
    { priceAdjustment: 0.0, name: 'Cold Foam' },
    { priceAdjustment: 0.0, name: 'Chocolate Drizzle' },
    { priceAdjustment: 0.0, name: 'Caramel Drizzle' }]
}

const findAdj = (arr, name) => {
        const opt = arr && arr.find(o => o.name === name);
        return opt ? Number(opt.priceAdjustment) : 0;
};

const sizeAdjustment = computed(() => findAdj(optionsMap.size, customizedItem.size));

const totalPrice = computed(() => {
    let total = (Number(item.price) || 0) + sizeAdjustment.value;
    total += findAdj(optionsMap.temperature, customizedItem.temperature);
    total += findAdj(optionsMap.milk, customizedItem.milk);
    if (customizedItem.flavor) {
        const flavorPrice = Number(customizedItem.flavor.match(/\$(\d+(?:\.\d{1,2})?)/)?.[1] || 0);
        total += flavorPrice * Number(customizedItem.flavorPumps || 1);
    }
    if (Array.isArray(customizedItem.extras)) {
        customizedItem.extras.forEach(e => {
            total += findAdj(optionsMap.extras, e);
        })
    }
    return Number(total);
});

const extrasTotal = computed(() => Number((totalPrice.value - (Number(item.price) || 0) - sizeAdjustment.value).toFixed(2)));

const totalPriceFormatted = computed(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice.value));
function addToCart() {
    // ensure the customized item has the computed price before adding or updating
    const payload = {
        ...customizedItem,
        price: Number(((Number(item.price) || 0) + sizeAdjustment.value).toFixed(2)),
        extrasTotal: extrasTotal.value,
    };
    if (props.isEdit && typeof props.editIndex === 'number') {
        // emit update so parent can handle or call store directly
        emit('update', { index: props.editIndex, item: payload });
    } else {
        store.addItem(payload);
    }
    closeCustomizer();
}

function decreaseFlavorPumps() {
    if (customizedItem.flavorPumps > 1) customizedItem.flavorPumps--;
}
</script>


<style scoped>
@reference "../styles/style.css";
/* Adjust the path as necessary */

.active {
    background-color: var(--color-primary-lighter);
}

.active label {
    color: white;
}

.pump-control {
    color: var(--color-primary);
}

.pump-control {
    flex-shrink: 0;
}

.flavor-control {
    border: 1px solid var(--color-outline);
    border-radius: 1rem;
    padding: 0.25rem 0.75rem;
}

.flavor-separator {
    align-self: stretch;
    width: 1px;
    background-color: var(--color-outline);
}

.pump-control button {
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 9999px;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.pump-control button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
}

@media (max-width: 400px) {
    .drink-image {
        max-width: 90px;
    }
}
</style>