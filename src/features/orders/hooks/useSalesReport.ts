import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import type { Order } from "../types/order";

export interface SalesReport {
  totalOrders: number;
  totalRevenue: number;
  averageTicket: number;
  ordersByStatus: Record<string, number>;
}

function toNumber(total: Order["total"]): number {
  return typeof total === "number" ? total : Number(total) || 0;
}

export function useSalesReport() {
  const [report, setReport] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const orders = await getOrders();

        const ordersByStatus: Record<string, number> = {};
        let totalRevenue = 0;
        let paidCount = 0;

        for (const order of orders) {
          const status = order.status || "desconhecido";
          ordersByStatus[status] = (ordersByStatus[status] ?? 0) + 1;

          if (status === "pago") {
            totalRevenue += toNumber(order.total);
            paidCount += 1;
          }
        }

        const result: SalesReport = {
          totalOrders: orders.length,
          totalRevenue,
          averageTicket: paidCount > 0 ? totalRevenue / paidCount : 0,
          ordersByStatus,
        };

        if (active) setReport(result);
      } catch {
        if (active) setError("Erro ao carregar relatório de vendas.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { report, loading, error };
}