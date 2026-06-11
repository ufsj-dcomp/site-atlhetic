export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ProductFormValues {
  name: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
}

export const emptyProductFormValues: ProductFormValues = {
  name: "",
  price: "",
  image: "",
  category: "",
  available: true,
};

export function productToFormValues(
  product?: Product | null
): ProductFormValues {
  if (!product) return emptyProductFormValues;

  return {
    name: product.name,
    price: String(product.price ?? ""),
    image: product.image,
    category: product.category,
    available: product.available,
  };
}