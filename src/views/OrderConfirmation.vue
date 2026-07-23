<template>
  <div class="order-confirmation page">
    <h1>Order Confirmation</h1>

    <div v-if="loading">Loading order details…</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="order">
      <p><strong>Confirmation ID:</strong> {{ order.id }}</p>
      <p><strong>Placed:</strong> {{ formattedDate }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Total:</strong> {{ formatCurrency(order.total) }}</p>

      <h2>Items</h2>
      <ul>
        <li v-for="(item, idx) in order.items" :key="idx">
          {{ item.quantity }} × {{ item.name }} — {{ formatCurrency(item.price) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No order found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const order = ref(null)

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
}

const confirmationId = route.query.confirmation || route.params.confirmation || ''

async function fetchOrder(id) {
  loading.value = true
  error.value = ''
  try {
    // Replace endpoint with your real API route if needed
    const res = await fetch(`/api/orders/${encodeURIComponent(id)}`)
    if (!res.ok) throw new Error(`Server returned ${res.status}`)
    const data = await res.json()
    order.value = data
  } catch (err) {
    error.value = 'Unable to load order: ' + (err.message || err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = String(confirmationId || '')
  if (!id || !isUuid(id)) {
    loading.value = false
    error.value = 'Missing or invalid confirmation id.'
    return
  }
  fetchOrder(id)
})

const formattedDate = computed(() => {
  if (!order.value || !order.value.createdAt) return ''
  return new Date(order.value.createdAt).toLocaleString()
})

function formatCurrency(cents) {
  if (cents == null) return ''
  const n = typeof cents === 'number' && cents > 1000 ? cents / 100 : cents
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n)
}
</script>

<style scoped>
.order-confirmation { max-width: 800px; margin: 2rem auto; padding: 1rem; }
.error { color: #b00020; }
ul { list-style: none; padding: 0; }
li { padding: 0.25rem 0; }
</style>
