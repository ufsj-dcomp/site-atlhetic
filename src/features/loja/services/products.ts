import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getProductById(id: string) {
  const docRef = doc(db, "products", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}