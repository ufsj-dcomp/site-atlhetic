import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; 
import type { GameData } from '../types/game';

export const createGame = async (gameData: GameData) => {
  try {
    const docRef = await addDoc(collection(db, 'games'), {
      ...gameData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(), 
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao cadastrar jogo: ", error);
    throw error;
  }
};