import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import { getUserProfile } from "../../users/services/userService";
import type { Order } from "../types/order";

export interface ClientOrderGroup {
  userId: string;
  clientName: string;
  orders: Order[];
}

export function useOrdersGroupedByClient() {
  const [groups, setGroups] = useState<ClientOrderGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const orders = await getOrders();

        const uniqueUserIds = Array.from(
          new Set(orders.map((order) => order.userId).filter(Boolean))
        );

        const profiles = await Promise.all(
          uniqueUserIds.map(async (uid) => {
            try {
              const profile = await getUserProfile(uid);
              return { uid, name: profile?.name || null };
            } catch {
              return { uid, name: null };
            }
          })
        );

        const nameByUid = new Map(profiles.map((p) => [p.uid, p.name]));

        const ordersByUid = new Map<string, Order[]>();
        for (const order of orders) {
          const key = order.userId || "sem-cliente";
          if (!ordersByUid.has(key)) ordersByUid.set(key, []);
          ordersByUid.get(key)!.push(order);
        }

        const result: ClientOrderGroup[] = Array.from(
          ordersByUid.entries()
        ).map(([userId, userOrders]) => ({
          userId,
          clientName:
            nameByUid.get(userId) ||
            (userId === "sem-cliente" ? "Cliente desconhecido" : userId),
          orders: userOrders,
        }));

        result.sort((a, b) =>
          a.clientName.localeCompare(b.clientName, "pt-BR")
        );

        if (active) setGroups(result);
      } catch {
        if (active) setError("Erro ao carregar pedidos.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { groups, loading, error };
}