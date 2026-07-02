import { useEffect, useState } from "react";
import { getOrderById } from "../services/orderService";
import type { Order } from "../types/order";

export function useOrderById(id?: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(() => Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    async function loadOrder() {
      try {
        const data = await getOrderById(id as string);
        if (active) setOrder(data);
      } catch {
        if (active) setError("Erro ao carregar pedido.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadOrder();

    return () => {
      active = false;
    };
  }, [id]);

  return { order, setOrder, loading, error };
}