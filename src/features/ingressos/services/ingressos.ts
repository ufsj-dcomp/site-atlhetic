import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function getIngressos() {
  const querySnapshot = await getDocs(collection(db, "games"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getIngressosById(id: string) {
  const docRef = doc(db, "games", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}