import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
  },
  actions: {
    addItem(item) {
      const existing = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        this.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeItem(item) {
      this.items = this.items.filter((i) => i !== item);
    },
    incrementQuantity(item) {
      const cartItem = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (cartItem) {
        cartItem.quantity = (cartItem.quantity || 1) + 1;
      }
    },
    decrementQuantity(item) {
      const cartItem = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (!cartItem) return;
      if ((cartItem.quantity || 1) > 1) {
        cartItem.quantity -= 1;
      } else {
        this.removeItem(cartItem);
      }
    },
    clearCart() {
      this.items = [];
    }
  },
});