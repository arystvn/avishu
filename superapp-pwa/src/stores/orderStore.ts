import { create } from 'zustand'

export type OrderStatus = 'placed' | 'tailoring' | 'ready'

export type OrderItem = {
  name: string
  qty: number
  status?: string
}

export type Order = {
  id: string
  clientId: string
  clientName: string
  franchiseeId?: string
  items: OrderItem[]
  status: OrderStatus
  createdAt?: unknown
  readyByDate?: string
}

type OrderState = {
  orders: Order[]
  activeOrder: Order | null
  setOrders: (orders: Order[]) => void
  setActiveOrder: (order: Order | null) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  activeOrder: null,
  setOrders: (orders) => set({ orders }),
  setActiveOrder: (activeOrder) => set({ activeOrder }),
  updateOrderStatus: (id, status) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      activeOrder: s.activeOrder?.id === id ? { ...s.activeOrder, status } : s.activeOrder,
    })),
}))

