import { useEffect, useState } from "react";
import { getProductById } from "../services/products";
import type { Product } from "../types/products";

export function useProductById(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productId = id;
    if (!productId) return;

    let active = true;

    async function loadProduct(currentId: string) {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(currentId);
        if (active) setProduct(data);
      } catch {
        if (active) setError("Erro ao carregar o produto.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProduct(productId);

    return () => {
      active = false;
    };
  }, [id]);

  return { product, loading, error };
}