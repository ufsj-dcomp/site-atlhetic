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