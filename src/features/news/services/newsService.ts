import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export const getNews = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "news")
    );

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(
      "Erro ao buscar notícias:",
      error
    );

    throw error;
  }
};

export const getNewsById = async (id: string) => {
  try {
    const docRef = doc(db, "news", id);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error(
      "Erro ao buscar notícia:",
      error
    );

    throw error;
  }
};