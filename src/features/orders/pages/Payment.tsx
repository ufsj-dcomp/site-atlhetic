import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";

import {
  getFirstOrder,
  updatePaymentMethod,
} from "../services/orderService";

import "../styles/Payment.css";

export default function Payment() {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] =
    useState("");

  const [orderId, setOrderId] =
    useState("");

  const [total, setTotal] =
    useState(0);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const order = await getFirstOrder();

      if (!order) return;

      setOrderId(order.id);

      const totalValue =
        typeof order.total === "number"
          ? order.total
          : parseFloat(
              String(order.total)
                .replace("R$", "")
                .replace(",", ".")
            );

      setTotal(totalValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    if (!selectedMethod) {
      alert(
        "Selecione uma forma de pagamento."
      );
      return;
    }

    try {
      await updatePaymentMethod(
        orderId,
        selectedMethod
      );

      alert(
        "Forma de pagamento salva com sucesso!"
      );

      navigate("/home");
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao salvar forma de pagamento."
      );
    }
  };

  return (
    <div className="payment-layout">
      <Sidebar />

      <div className="payment-content">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <h1>
          Forma de Pagamento
        </h1>

        <div className="payment-card">

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="PIX"
              checked={
                selectedMethod === "PIX"
              }
              onChange={(e) =>
                setSelectedMethod(
                  e.target.value
                )
              }
            />
            PIX
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cartão de Crédito"
              checked={
                selectedMethod ===
                "Cartão de Crédito"
              }
              onChange={(e) =>
                setSelectedMethod(
                  e.target.value
                )
              }
            />
            Cartão de Crédito
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cartão de Débito"
              checked={
                selectedMethod ===
                "Cartão de Débito"
              }
              onChange={(e) =>
                setSelectedMethod(
                  e.target.value
                )
              }
            />
            Cartão de Débito
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Boleto"
              checked={
                selectedMethod ===
                "Boleto"
              }
              onChange={(e) =>
                setSelectedMethod(
                  e.target.value
                )
              }
            />
            Boleto Bancário
          </label>

          <div className="payment-total">
            <span>Total:</span>

            <strong>
              R$ {total.toFixed(2)}
            </strong>
          </div>

          <button
            className="confirm-payment"
            onClick={handleConfirm}
          >
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}