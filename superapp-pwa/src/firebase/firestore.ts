import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './config'
import type { Order, OrderStatus } from '../stores/orderStore'

export function listenToAllOrders(onOrders: (orders: Order[]) => void): Unsubscribe {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onOrders(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, 'id'>) })))
  })
}

export function listenToClientOrders(
  clientId: string,
  onOrders: (orders: Order[]) => void,
): Unsubscribe {
  const q = query(
    collection(db, 'orders'),
    where('clientId', '==', clientId),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(q, (snapshot) => {
    onOrders(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, 'id'>) })))
  })
}

export async function setOrderStatus(orderId: string, status: OrderStatus) {
  await updateDoc(doc(db, 'orders', orderId), { status })
}

