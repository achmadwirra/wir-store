'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItemType } from '@/lib/types'

interface CartStore {
  items: CartItemType[]
  addItem: (item: Omit<CartItemType, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getSubtotal: () => number
  getShipping: () => number
  getTax: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color
          )

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: Math.min(i.quantity + (item.quantity || 1), i.stock) }
                  : i
              ),
            }
          }

          const newItem: CartItemType = {
            ...item,
            id: `${item.productId}-${item.size || 'default'}-${item.color || 'default'}-${Date.now()}`,
            quantity: item.quantity || 1,
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > 100 ? 0 : 9.99
      },

      getTax: () => {
        return get().getSubtotal() * 0.08
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShipping() + get().getTax()
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'wir-store-cart',
    }
  )
)
