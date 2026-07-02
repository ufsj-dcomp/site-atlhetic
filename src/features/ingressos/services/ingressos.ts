import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { Ingresso, IngressoCompra, IngressoData } from "../types/ingressos";

const gamesCollection = collection(db, "games");
const ingressosCompradosCollection = collection(db, "ingressos_comprados");

export async function getIngressos(): Promise<Ingresso[]> {
  const querySnapshot = await getDocs(gamesCollection);

  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as IngressoData),
  }));
}

export async function getIngressosById(id: string): Promise<Ingresso | null> {
  const docRef = doc(db, "games", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as IngressoData),
  };
}

function normalizeIngressoCompra(
  id: string,
  data: Record<string, unknown>
): IngressoCompra {
  const createdAtValue = data.createdAt as { toDate?: () => Date } | undefined;

  return {
    id,
    userId: typeof data.userId === "string" ? data.userId : "",
    ingressoId: typeof data.ingressoId === "string" ? data.ingressoId : "",
    title: typeof data.title === "string" ? data.title : "",
    dateTime: typeof data.dateTime === "string" ? data.dateTime : "",
    quantidade:
      typeof data.quantidade === "number"
        ? data.quantidade
        : Number(data.quantidade ?? 0),
    valor: typeof data.valor === "number" ? data.valor : Number(data.valor ?? 0),
    total: typeof data.total === "number" ? data.total : Number(data.total ?? 0),
    paymentMethod:
      typeof data.paymentMethod === "string" ? data.paymentMethod : "",
    status: typeof data.status === "string" ? data.status : "",
    createdAt:
      createdAtValue && typeof createdAtValue.toDate === "function"
        ? createdAtValue.toDate().toLocaleString("pt-BR")
        : undefined,
  };
}

export async function getIngressosComprados(): Promise<IngressoCompra[]> {
  const snapshot = await getDocs(ingressosCompradosCollection);

  return snapshot.docs.map((docSnap) =>
    normalizeIngressoCompra(docSnap.id, docSnap.data())
  );
}