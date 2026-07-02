export interface IngressoData {
  title: string;
  dateTime: string;
  location: string;
  opponent: string;
  valor: number;
}

export interface Ingresso extends IngressoData {
  id: string;
}

export interface IngressoCompra {
  id: string;
  userId: string;
  ingressoId: string;
  title: string;
  dateTime: string;
  quantidade: number;
  valor: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt?: string;
}