import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: (() => {
      try {
        if (typeof window !== 'undefined') {
          const raw = localStorage.getItem('cart_items');
          return raw ? JSON.parse(raw) : [];
        }
      } catch (e) {
        // ignore
      }
      return [];
    })(),
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    extras: (state) => state.items.reduce((total, item) => total + (Number(item.extrasTotal) || 0) * (item.quantity || 1), 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + ((Number(item.price) || 0) + (Number(item.extrasTotal) || 0)) * (item.quantity || 1), 0),
  },
  actions: {
    saveCart() {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart_items', JSON.stringify(this.items));
        }
      } catch (e) {
        // ignore
      }
    },
    addItem(item) {
      const existing = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        this.items.push({ ...item, quantity: item.quantity || 1 });
      }
      this.saveCart();
    },
    removeItem(item) {
      this.items = this.items.filter((i) => i !== item);
      this.saveCart();
    },
    incrementQuantity(item) {
      const cartItem = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (cartItem) {
        cartItem.quantity = (cartItem.quantity || 1) + 1;
        this.saveCart();
      }
    },
    decrementQuantity(item) {
      const cartItem = this.items.find((i) => (i.id !== undefined && item.id !== undefined) ? i.id === item.id : i === item);
      if (!cartItem) return;
      if ((cartItem.quantity || 1) > 1) {
        cartItem.quantity -= 1;
        this.saveCart();
      } else {
        this.removeItem(cartItem);
      }
    },
    updateItemAt(index, updatedItem) {
      if (typeof index !== 'number' || index < 0 || index >= this.items.length) return;
      // merge existing fields with updatedItem
      this.items[index] = { ...this.items[index], ...updatedItem };
      this.saveCart();
    },
    clearCart() {
      this.items = [];
      this.saveCart();
    }
  },
});