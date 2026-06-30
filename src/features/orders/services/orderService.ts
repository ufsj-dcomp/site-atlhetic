import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";
import type { Order } from "../types/order";

export const getFirstOrder = async (): Promise<Order | null> => {
  const snapshot = await getDocs(collection(db, "orders"));

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