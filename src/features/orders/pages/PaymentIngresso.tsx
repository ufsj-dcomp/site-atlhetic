import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase"; 

import Sidebar from "../../../components/Sidebar";

import "../styles/PaymentIngresso.css";

export default function PaymentIngresso() {
  const navigate = useNavigate();

  const location = useLocation();

  const ingresso = location.state?.ingresso;
  const quantidade = location.state?.quantidade;
  const total = location.state?.total;

  const [selectedMethod, setSelectedMethod] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!selectedMethod) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    if (!auth.currentUser) {
      alert("Você precisa estar logado para finalizar a compra.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "ingressos_comprados"), {
        userId: auth.currentUser.uid,
        ingressoId: ingresso.id || "ID_NAO_INFORMADO",
        title: ingresso.title,
        dateTime: ingresso.dateTime,
        quantidade: quantidade,
        valor: ingresso.valor,
        total: total,
        paymentMethod: selectedMethod,
        status: "DELIVERED", 
        createdAt: new Date(),
      });

      alert("Ingresso comprado com sucesso!");
      navigate("/historico-compras"); 

    } catch (error) {
      console.error("Erro ao salvar o ingresso:", error);
      alert("Houve um erro ao processar seu pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

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

        <h1>Pagamento do Ingresso</h1>

        <div className="payment-card">

          <h2 className="ingresso-titulo">{ingresso.title}</h2>

          <p>
            Quantidade: <strong>{quantidade}</strong>
          </p>

          <p>
            Valor unitário:
            <strong> R$ {ingresso.valor}</strong>
          </p>

          <hr />

          <label className="payment-option">
            <input
              type="radio"
              value="PIX"
              checked={selectedMethod === "PIX"}
              onChange={(e) =>
                setSelectedMethod(e.target.value)
              }
            />
            PIX
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="Cartão de Crédito"
              checked={
                selectedMethod === "Cartão de Crédito"
              }
              onChange={(e) =>
                setSelectedMethod(e.target.value)
              }
            />
            Cartão de Crédito
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="Cartão de Débito"
              checked={
                selectedMethod === "Cartão de Débito"
              }
              onChange={(e) =>
                setSelectedMethod(e.target.value)
              }
            />
            Cartão de Débito
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="Boleto"
              checked={selectedMethod === "Boleto"}
              onChange={(e) =>
                setSelectedMethod(e.target.value)
              }
            />
            Boleto Bancário
          </label>

          <div className="payment-total">
            <span>Total</span>

            <strong>
                R$ {total.toFixed(2)}
            </strong>
            </div>

            {selectedMethod && (
            <>
                <div className="selected-payment">
                Forma de pagamento escolhida:
                <strong> {selectedMethod}</strong>
                </div>

                <div className="payment-buttons">
                <button
                    className="cancel-payment"
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </button>

                <button
                    className="confirm-payment"
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {loading ? "Processando..." : "Confirmar Pagamento"}
                </button>
                </div>
            </>
            )}

    

        </div>

      </div>
    </div>
  );
}