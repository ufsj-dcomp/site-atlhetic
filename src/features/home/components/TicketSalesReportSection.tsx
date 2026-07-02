import { useTicketSalesReport } from "../../ingressos/hooks/useTicketSalesReport";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function TicketSalesReportSection() {
  const { report, loading, error } = useTicketSalesReport();

  if (loading) {
    return <div className="sales-report-empty">Carregando ingressos...</div>;
  }

  if (error || !report) {
    return (
      <div className="sales-report-alert">
        {error ?? "Erro ao carregar relatório."}
      </div>
    );
  }

  return (
    <div className="sales-report-section">
      <h2 className="sales-report-section-title">Vendas de Ingressos</h2>

      <div className="sales-report-cards">
        <div className="sales-report-card">
          <span className="sales-report-card-label">Total de Vendas</span>
          <strong className="sales-report-card-value">
            {report.totalSales}
          </strong>
        </div>

        <div className="sales-report-card">
          <span className="sales-report-card-label">
            Ingressos Vendidos
          </span>
          <strong className="sales-report-card-value">
            {report.totalTicketsSold}
          </strong>
        </div>

        <div className="sales-report-card">
          <span className="sales-report-card-label">Faturamento</span>
          <strong className="sales-report-card-value">
            {currencyFormatter.format(report.totalRevenue)}
          </strong>
        </div>

        <div className="sales-report-card">
          <span className="sales-report-card-label">
            Preço Médio por Ingresso
          </span>
          <strong className="sales-report-card-value">
            {currencyFormatter.format(report.averageTicketPrice)}
          </strong>
        </div>
      </div>
    </div>
  );
}