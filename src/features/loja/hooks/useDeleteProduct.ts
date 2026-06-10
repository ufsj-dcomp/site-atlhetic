import { useState } from "react";
import { deleteProduct } from "../services/products";

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function removeProduct(id: string) {
    setLoading(true);
    setError(null);

    try {
      await deleteProduct(id);
    } catch {
      setError("Erro ao remover produto.");
      throw new Error("Erro ao remover produto.");
    } finally {
      setLoading(false);
    }
  }

  return {
    removeProduct,
    loading,
    error,
  };
}