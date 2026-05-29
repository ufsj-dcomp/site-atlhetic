import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; 
import type { GameData } from '../types/game';

//Cadastrar um jogo
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

//Buscar os jogos
export const getGames = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'games'));
    // Retorna os dados do jogo junto com o ID único gerado pelo Firebase
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Erro ao buscar jogos: ", error);
    throw error;
  }
};

//Atualizar um jogo existente
export const updateGame = async (id: string, data: Partial<GameData>) => {
  try {
    const gameRef = doc(db, 'games', id);
    await updateDoc(gameRef, {
      ...data,
      updatedAt: serverTimestamp() // Atualiza a data de modificação
    });
  } catch (error) {
    console.error("Erro ao atualizar jogo: ", error);
    throw error;
  }
};

//Deletar um jogo
export const deleteGame = async (id: string) => {
  try {
    const gameRef = doc(db, 'games', id);
    await deleteDoc(gameRef);
  } catch (error) {
    console.error("Erro ao deletar jogo: ", error);
    throw error;
  }
};