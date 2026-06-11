import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";

import "../styles/OrderSummary.css";

export default function OrderSummary() {
  const navigate = useNavigate();

  const itens = [
    {
      id: 1,
      nome: "Camisa Oficial",
      quantidade: 2,
      valor: 300,
    },
    {
      id: 2,
      nome: "Copo Stanley Athletic",
      quantidade: 1,
      valor: 139.99,
    },
  ];

  const total = itens.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  return (
    <div className="order-layout">
      <Sidebar />

      <div className="order-content">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <h1 className="order-title">
          Resumo do Pedido
        </h1>

        <div className="order-card">

          <div className="order-header">
            <h2>Itens da Compra</h2>
          </div>

          {itens.map((item) => (
            <div
              key={item.id}
              className="order-item"
            >
              <div>
                <h3>{item.nome}</h3>

                <p>
                  Quantidade: {item.quantidade}
                </p>
              </div>

              <strong>
                R$ {(item.valor * item.quantidade).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="order-total">
            <span>Total</span>

            <strong>
              R$ {total.toFixed(2)}
            </strong>
          </div>

        </div>

        <button
          className="continue-button"
          onClick={() =>
            navigate("/pagamento")
          }
        >
          Escolher Forma de Pagamento
        </button>

      </div>
    </div>
  );
}