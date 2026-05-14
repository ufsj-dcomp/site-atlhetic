import { collection, getDocs } from "firebase/firestore";

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