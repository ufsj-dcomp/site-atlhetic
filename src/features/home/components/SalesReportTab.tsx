import { useSalesReport } from "../../orders/hooks/useSalesReport";
import { TicketSalesReportSection } from "./TicketSalesReportSection";
import "../styles/SalesReportTab.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente",
  pago: "Pago",
};

const STATUS_COLORS: Record<string, string> = {
  pendente: "#ca8a04",
  pago: "#166534",
};

function ProductSalesReportSection() {
  const { report, loading, error } = useSalesReport();

  if (loading) {
    return <div className="sales-report-empty">Carregando produtos...</div>;
  }

  if (error || !report) {
    return (
      <div className="sales-report-alert">
        {error ?? "Erro ao carregar relatório."}
      </div>
    );
  }

  const statusEntries = Object.entries(report.ordersByStatus);
  const maxCount = Math.max(...statusEntries.map(([, count]) => count), 1);

  return (
    <div className="sales-report-section">
      <h2 className="sales-report-section-title">Vendas de Produtos</h2>

      <div className="sales-report-cards">
        <div className="sales-report-card">
          <span className="sales-report-card-label">Total de Pedidos</span>
          <strong className="sales-report-card-value">
            {report.totalOrders}
          </strong>
        </div>

        <div className="sales-report-card">
          <span className="sales-report-card-label">
            Faturamento (pedidos pagos)
          </span>
          <strong className="sales-report-card-value">
            {currencyFormatter.format(report.totalRevenue)}
          </strong>
        </div>

        <div className="sales-report-card">
          <span className="sales-report-card-label">Ticket Médio</span>
          <strong className="sales-report-card-value">
            {currencyFormatter.format(report.averageTicket)}
          </strong>
        </div>
      </div>

      <div className="sales-report-chart-card">
        <h3>Pedidos por Status</h3>

        {statusEntries.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <div className="sales-report-chart">
            {statusEntries.map(([status, count]) => (
              <div className="sales-report-bar-row" key={status}>
                <span className="sales-report-bar-label">
                  {STATUS_LABELS[status] ?? status}
                </span>

                <div className="sales-report-bar-track">
                  <div
                    className="sales-report-bar-fill"
                    style={{
                      width: `${(count / maxCount) * 100}%`,
                      backgroundColor: STATUS_COLORS[status] ?? "#666",
                    }}
                  />
                </div>

                <span className="sales-report-bar-count">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SalesReportTab() {
  return (
    <div className="sales-report-grid">
      <ProductSalesReportSection />
      <TicketSalesReportSection />
    </div>
  );
}