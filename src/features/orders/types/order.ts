export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  total: number | string;
  items: OrderItem[];
  paymentMethod?: string;
  createdAt?: string;
}