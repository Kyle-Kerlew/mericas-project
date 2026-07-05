import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price, 0),
  },
  actions: {
    addItem(item) {
      this.items.push(item);
    },
    removeItem(item) {
      this.items = this.items.filter((i) => i !== item);
    },
    clearCart() {
      this.items = [];
    }
  },
});