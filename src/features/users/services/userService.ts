import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as UserProfile;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Pick<UserProfile, "name" | "phone" | "cpf" | "birthDate">>
) {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}