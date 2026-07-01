import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

import { getIngressosById } from "../services/ingressos";

import "../styles/IngressosDetalhe.css";

export default function IngressosDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingresso, setIngresso] = useState<any>(null);

  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function loadIngresso() {
      if (!id) return;

      const data = await getIngressosById(id);

      setIngresso(data);
    }

    loadIngresso();
  }, [id]);

  if (!ingresso) {
    return <h1>Carregando...</h1>;
  }

  const gameDate = new Date(ingresso.dateTime);

  return (
    <div className="layout">
      <Sidebar />

      <div className="ingresso-container">
        <div className="ingresso-content">

          <div className="ingresso-info">
            <h1>{ingresso.title}</h1>

            <div className="info-item">
              <strong>Adversário:</strong> {ingresso.opponent}
            </div>

            <div className="info-item">
              <strong>Local:</strong> {ingresso.location}
            </div>

            <div className="info-item">
              <strong>Data:</strong>{" "}
              {gameDate.toLocaleDateString("pt-BR")}
            </div>

            <div className="info-item">
              <strong>Horário:</strong>{" "}
              {gameDate.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="info-item">
              <strong>Valor do ingresso:</strong> R$ {ingresso.valor}
            </div>

            <div className="campo">
              <label>Quantidade</label>

              <input
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(Number(e.target.value))
                }
              />
            </div>

            <div className="info-item">
              <strong>Total:</strong>
              <h2>
                R$ {(ingresso.valor * quantidade).toFixed(2)}
              </h2>
            </div>

            <button
              className="comprar-btn"
              onClick={() =>
                navigate("/pagamento-ingresso", {
                  state: {
                    ingresso,
                    quantidade,
                    total: ingresso.valor * quantidade,
                  },
                })
              }
            >
              Comprar Ingresso
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}