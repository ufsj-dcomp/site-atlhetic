import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { Product, ProductFormValues } from "../types/products";
import { onSnapshot } from "firebase/firestore";

const productsCollection = collection(db, "products");

function normalizeProduct(
  id: string,
  data: Record<string, unknown>
): Product {
  return {
    id,
    name: typeof data.name === "string" ? data.name : "",
    price: Number(data.price ?? 0),
    image: typeof data.image === "string" ? data.image : "",
    category: typeof data.category === "string" ? data.category : "",
    available: Boolean(data.available ?? true),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

function toPayload(values: ProductFormValues) {
  return {
    name: values.name.trim(),
    price: Number(values.price),
    image: values.image.trim(),
    category: values.category.trim(),
    available: values.available,
    updatedAt: serverTimestamp(),
  };
}

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(productsCollection);

  return querySnapshot.docs.map((docSnap) =>
    normalizeProduct(docSnap.id, docSnap.data())
  );
}

export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot.id, snapshot.data());
}

export async function createProduct(values: ProductFormValues): Promise<string> {
  const docRef = await addDoc(productsCollection, {
    ...toPayload(values),
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateProduct(
  id: string,
  values: ProductFormValues
): Promise<void> {
  const docRef = doc(db, "products", id);

  await updateDoc(docRef, toPayload(values));
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
}

export function subscribeToProducts(
  onData: (products: Product[]) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    productsCollection,
    (snapshot) => {
      const products = snapshot.docs.map((docSnap) =>
        normalizeProduct(docSnap.id, docSnap.data())
      );
      onData(products);
    },
    onError
  );
}