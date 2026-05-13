import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase'; 
import type { NewsData } from '../pages/CreateNews';

export const createNews = async (data: NewsData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    // Converte a string de data do formulário para o formato Timestamp do Firebase
    const publishedDate = new Date(data.publishedAt);

    await addDoc(collection(db, 'news'), {
      title: data.title,
      content: data.content,
      image: data.image, // Por enquanto vamos salvar a URL da imagem em texto
      publishedAt: Timestamp.fromDate(publishedDate),
      authorId: user.uid, // Pega o ID do admin logado automaticamente!
    });
  } catch (error) {
    console.error("Erro ao criar notícia: ", error);
    throw error;
  }
};