import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CreateOrderDTO {
  userId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: string;
}

export async function createOrder(data: CreateOrderDTO) {
  const docRef = await addDoc(collection(db, "orders"), {
    userId: data.userId,
    items: data.items,
    total: data.total,
    paymentMethod: data.paymentMethod,
    status: data.status,
    createdAt: serverTimestamp(), 
  });

  return docRef.id;
}