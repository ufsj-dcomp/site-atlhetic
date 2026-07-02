import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useOrdersGroupedByClient } from "../../hooks/useOrdersGroupedByClient";
import "../../styles/adminOrdersPage.css";
import "../../styles/adminOrdersTable.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function AdminOrders() {
  const navigate = useNavigate();
  const { groups, loading, error } = useOrdersGroupedByClient();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleClient(userId: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-header">
          <div className="admin-orders-header-left">
            <h1>Gerenciar Pedidos</h1>
            <p>Acompanhe e atualize o status dos pedidos por cliente.</p>
          </div>

          <button
            type="button"
            className="admin-button admin-button-back"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>

        {loading && (
          <div className="admin-orders-empty">Carregando pedidos...</div>
        )}

        {error && <div className="admin-orders-alert">{error}</div>}

        {!loading && !error && groups.length === 0 && (
          <div className="admin-orders-empty">Nenhum pedido encontrado.</div>
        )}

        {!loading && !error && groups.length > 0 && (
          <div className="admin-orders-clients">
            {groups.map((group) => {
              const isOpen = expanded.has(group.userId);

              return (
                <div className="admin-orders-client-group" key={group.userId}>
                  <button
                    type="button"
                    className="admin-orders-client-header"
                    onClick={() => toggleClient(group.userId)}
                  >
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                    <span className="admin-orders-client-name">
                      {group.clientName}
                    </span>
                    <span className="admin-orders-client-count">
                      {group.orders.length} pedido
                      {group.orders.length !== 1 ? "s" : ""}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="admin-orders-client-orders">
                      {group.orders.map((order) => (
                        <div className="admin-order-row" key={order.id}>
                          <span className="admin-order-row-id">
                            #{order.id.slice(0, 8)}
                          </span>
                          <span className="admin-order-row-date">
                            {order.createdAt ?? "—"}
                          </span>
                          <span className="admin-order-row-total">
                            {typeof order.total === "number"
                              ? currencyFormatter.format(order.total)
                              : order.total}
                          </span>
                          <span className="admin-order-badge">
                            {order.status}
                          </span>
                          <button
                            type="button"
                            className="admin-button admin-button-secondary"
                            onClick={() =>
                              navigate(`/admin/pedidos/${order.id}`)
                            }
                          >
                            Ver detalhes
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}