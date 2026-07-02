import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useOrderById } from "../../hooks/useOrderById";
import { updateOrderStatus } from "../../services/orderService";
import "../../styles/adminOrdersPage.css";
import "../../styles/adminOrderDetail.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, setOrder, loading, error } = useOrderById(id);

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentStatus = selectedStatus || order?.status || "";

  async function handleSaveStatus() {
    if (!order || !selectedStatus || selectedStatus === order.status) return;

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updateOrderStatus(order.id, selectedStatus);
      setOrder({ ...order, status: selectedStatus });
      setSaveSuccess(true);
    } catch {
      setSaveError("Erro ao atualizar status do pedido.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-orders-page">
        <div className="admin-orders-container">
          <div className="admin-orders-empty">Carregando pedido...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="admin-orders-page">
        <div className="admin-orders-container">
          <div className="admin-orders-alert">
            {error ?? "Pedido não encontrado."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-header">
          <div className="admin-orders-header-left">
            <h1>Pedido #{order.id.slice(0, 8)}</h1>
          </div>

          <button
            type="button"
            className="admin-button admin-button-back"
            onClick={() => navigate("/admin/pedidos")}
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>

        <div className="admin-order-detail-card">
          <h2>Itens do Pedido</h2>

          {order.items.length === 0 ? (
            <p>Pedido sem itens.</p>
          ) : (
            order.items.map((item, index) => (
              <div key={index} className="admin-order-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantidade: {item.quantity}</p>
                </div>
                <strong>
                  {currencyFormatter.format(item.price * item.quantity)}
                </strong>
              </div>
            ))
          )}

          <div className="admin-order-total">
            <span>Total</span>
            <strong>
              {typeof order.total === "number"
                ? currencyFormatter.format(order.total)
                : order.total}
            </strong>
          </div>

          {order.paymentMethod && (
            <p className="admin-order-payment">
              Forma de pagamento: {order.paymentMethod}
            </p>
          )}

          {order.createdAt && (
            <p className="admin-order-date">Criado em: {order.createdAt}</p>
          )}
        </div>

        <div className="admin-order-status-card">
          <h2>Status do Pedido</h2>

          <div className="admin-order-status-field">
            <label htmlFor="status">Status atual</label>
            <select
              id="status"
              value={currentStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setSaveSuccess(false);
              }}
            >
              <option value="pendente">pendente</option>
              <option value="pago">pago</option>
            </select>
          </div>

          {saveError && <p className="admin-order-error">{saveError}</p>}
          {saveSuccess && (
            <p className="admin-order-success">
              Status atualizado com sucesso!
            </p>
          )}

          <button
            type="button"
            className="admin-button admin-button-primary"
            onClick={handleSaveStatus}
            disabled={
              saving || !selectedStatus || selectedStatus === order.status
            }
          >
            {saving ? "Salvando..." : "Salvar status"}
          </button>
        </div>
      </div>
    </div>
  );
}