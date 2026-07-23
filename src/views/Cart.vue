<template>
    <transition name="fade" appear>
        <div class="bg-white px-4 my-4">
            <header>
                <div class="grid custom-grid-nav-header">
                    <button @click="closeCustomizer" aria-label="Back" class="cursor-pointer grid-column-1">
                        <IconArrowLeftOutline color="#FF7FB1" class="inline icon-thin" height="48" width="48" />
                    </button>
                    <div class="grid-column-2">
                        <h1 class="text-lg font-bold text-primary">Your Cart</h1>
                    </div>
                    <div></div>
                </div>

            </header>

            <p v-if="cartItems.length" class="cart-subtitle">Good choices! We can’t wait to make your day.</p>

            <section v-if="cartItems.length">
                <div v-for="item in cartItems" :key="item.id"
                    class="grid custom-grid py-2 px-2 border-b border-b-background-alt-hover">
                    <img :src="item.image || placeholderImage" :alt="item.name" class="item-image" />
                    <div>
                        <div>
                            <h2 class="text-md font-bold mb-1">{{ item.name }}</h2>
                            <p class="text-sm text-surface-secondary font-semibold">{{ item.size }} · {{
                                item.temperature }}</p>
                            <p class="text-sm  text-surface-secondary font-semibold">{{ item.milk }}</p>
                            <button class="text-primary text-sm font-semibold" @click="editItem(item)">Edit</button>
                        </div>

                    </div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button @click="decrement(item)">−</button>
                            <span>{{ item.quantity || 1 }}</span>
                            <button @click="increment(item)">+</button>
                        </div>
                        <div class="item-price">{{ formatCurrency((item.price || 0) * (item.quantity || 1)) }}</div>
                    </div>
                </div>
            </section>
            <section v-else class="cart-empty" style="text-align:center;padding:24px;color:#5f3b58;">
                <p class="font-bold" style="margin-bottom:8px;">Your cart is empty</p>
                <p>There are no items in the cart, start shopping to add something yummy!</p>
            </section>
            <section class="p-4" v-if="cartItems.length">
                <div class="flex gap-1 justify-between">
                    <span>Subtotal</span>
                    <span>{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex gap-1 justify-between">
                    <span>Extras</span>
                    <span>{{ formatCurrency(extras) }}</span>
                </div>
                <div class="flex gap-1 justify-between">
                    <span>Tax (7.5%)</span>
                    <span>{{ formatCurrency(tax) }}</span>
                </div>
                <div class="flex gap-1 justify-between">
                    <span>Total</span>
                    <span>{{ formatCurrency(total) }}</span>
                </div>
            </section>

            <button class="checkout-button" type="button" v-if="cartItems.length" @click="handleCheckout">Checkout</button>
            <button class="continue-button" type="button" @click="continueShopping">Continue Shopping</button>
        </div>
    </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { IconArrowLeftOutline } from '@iconify-prerendered/vue-flowbite'

import paymentService from '@/services/paymentService'
const router = useRouter()
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items || [])
const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
)
const extras = computed(() => cartStore.extras ?? 2.25)
const tax = computed(() => subtotal.value * 0.075)
const total = computed(() => subtotal.value + tax.value + extras.value)

const placeholderImage = '/assets/coffee-placeholder.png'
const continueShopping = () => router.back()

const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const handleCheckout = async () => {
    console.log('checkout button clicked')
    try {
        const result = await paymentService.listLocations()
        console.log('locations:', result)
        const link = await paymentService.createPaymentLink({
            items: cartItems.value,
            amount: total.value,
        })
        //reddirect to link result
        window.location.href = link;
        console.log('generated link:', link)
    } catch (error) {
        console.error('Checkout failed:', error)
    }
}
const increment = (item) => {
    if (cartStore.incrementQuantity) {
        cartStore.incrementQuantity(item.id)
    } else if (cartStore.updateItem) {
        cartStore.updateItem(item.id, { quantity: (item.quantity || 1) + 1 })
    }
}

const decrement = (item) => {
    if (item.quantity > 1) {
        if (cartStore.decrementQuantity) {
            cartStore.decrementQuantity(item.id)
        } else if (cartStore.updateItem) {
            cartStore.updateItem(item.id, { quantity: (item.quantity || 1) - 1 })
        }
    }
}
const editItem = () => {
    // Placeholder to open item edit flow if available
}
</script>

<style scoped>
.custom-grid {
    grid-template-columns: 0.75fr 1.25fr 1fr;
    align-items: center;
    justify-content: center;
}

.cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.icon-button {
    border: none;
    background: rgba(255, 255, 255, 0.8);
    color: #d41d73;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 1rem;
}

.cart-subtitle {
    margin: 0 0 20px;
    color: #733156;
    text-align: center;
}


.item-image {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    object-fit: cover;
    background: #fde8f3;
}

.item-main {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: flex-start;
}

.item-main h2 {
    margin: 0 0 8px;
    font-size: 1rem;
}


.edit-link {
    margin-top: 10px;
    border: none;
    background: transparent;
    color: #d41d73;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
}

.item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #f4c3dc;
    border-radius: 999px;
    padding: 6px 10px;
    background: #fff0f6;
}

.quantity-control button {
    border: none;
    background: transparent;
    color: #d41d73;
    font-size: 1.1rem;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
}

.item-price {
    font-weight: 700;
    color: #d41d73;
}

.gift-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px;
    border: none;
    border-radius: 18px;
    background: #ffe7f2;
    color: #d41d73;
    font-weight: 600;
    margin-bottom: 20px;
    cursor: pointer;
}

.checkout-button,
.continue-button {
    width: 100%;
    border: none;
    border-radius: 18px;
    padding: 16px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
}

.checkout-button {
    background: linear-gradient(90deg, #d41d73, #b42d80);
    color: #fff;
    margin-bottom: 12px;
}

.custom-grid-nav-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    position: relative;
}
.grid-column-1 {
    grid-column: 1;
    align-self: center;
}
.grid-column-2 {
    /* Center the title relative to the page, ignoring the first column width */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}

:deep(.icon-thin path) {
    stroke-width: 1px !important;
}

.continue-button {
    background: transparent;
    color: #d41d73;
    border: 2px solid #f7d2e6;
}
</style>
