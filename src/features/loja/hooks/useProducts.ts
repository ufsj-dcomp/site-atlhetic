import { useEffect, useState } from "react";
import { subscribeToProducts } from "../services/products";
import type { Product } from "../types/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (data) => {
        setProducts(data);
        setLoading(false);
      },
      () => {
        setError("Erro ao carregar produtos.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    products,
    setProducts,
    loading,
    error,
  };
}