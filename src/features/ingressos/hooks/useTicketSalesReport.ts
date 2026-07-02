import { useEffect, useState } from "react";
import { getIngressosComprados } from "../services/ingressos";

export interface TicketSalesReport {
  totalSales: number;
  totalTicketsSold: number;
  totalRevenue: number;
  averageTicketPrice: number;
}

export function useTicketSalesReport() {
  const [report, setReport] = useState<TicketSalesReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const compras = await getIngressosComprados();

        const totalTicketsSold = compras.reduce(
          (sum, compra) => sum + compra.quantidade,
          0
        );
        const totalRevenue = compras.reduce(
          (sum, compra) => sum + compra.total,
          0
        );

        const result: TicketSalesReport = {
          totalSales: compras.length,
          totalTicketsSold,
          totalRevenue,
          averageTicketPrice:
            totalTicketsSold > 0 ? totalRevenue / totalTicketsSold : 0,
        };

        if (active) setReport(result);
      } catch {
        if (active) setError("Erro ao carregar relatório de ingressos.");
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