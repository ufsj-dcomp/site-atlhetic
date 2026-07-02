export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  description: string;
  stock: number;
};

export type ProductFormValues = {
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  stock: string;
};

export interface ItemPedido {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

export interface Pedido {
  id: string;
  userId: string;
  data: Date;
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
  total: number;
  itens: ItemPedido[];
}