import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { Order, OrderItem } from "../types/order";


interface CreateOrderDTO {
  userId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: string;
}

const ordersCollection = collection(db, "orders");

export const getFirstOrder = async (): Promise<Order | null> => {
  const snapshot = await getDocs(ordersCollection);

  if (snapshot.empty) {
    return null;
  }

  const firstDoc = snapshot.docs[0];
  return {
    id: firstDoc.id,
    ...(firstDoc.data() as Omit<Order, "id">),
  };
};

export const updatePaymentMethod = async (
  orderId: string,
  paymentMethod: string
) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    paymentMethod,
  });
};


export async function createOrder(data: CreateOrderDTO) {
  const docRef = await addDoc(ordersCollection, {
    userId: data.userId,
    items: data.items,
    total: data.total,
    paymentMethod: data.paymentMethod,
    status: data.status,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

function normalizeOrder(id: string, data: Record<string, unknown>): Order {
  const createdAtValue = data.createdAt as { toDate?: () => Date } | undefined;

  return {
    id,
    userId: typeof data.userId === "string" ? data.userId : "",
    status: typeof data.status === "string" ? data.status : "pendente",
    total:
      typeof data.total === "number" ? data.total : Number(data.total ?? 0),
    items: Array.isArray(data.items) ? (data.items as OrderItem[]) : [],
    paymentMethod:
      typeof data.paymentMethod === "string" ? data.paymentMethod : undefined,
    createdAt:
      createdAtValue && typeof createdAtValue.toDate === "function"
        ? createdAtValue.toDate().toLocaleString("pt-BR")
        : undefined,
  };
}

export async function getOrders(): Promise<Order[]> {
  const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((docSnap) =>
    normalizeOrder(docSnap.id, docSnap.data())
  );
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orderRef = doc(db, "orders", id);
  const snapshot = await getDoc(orderRef);

  if (!snapshot.exists()) return null;

  return normalizeOrder(snapshot.id, snapshot.data());
}

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<void> {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, { status });
}