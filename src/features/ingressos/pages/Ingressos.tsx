import { useEffect, useState } from "react";
import { getIngressos } from "../services/ingressos";
import Sidebar from "../../../components/Sidebar";
import "../styles/ingressos.css";
import { useNavigate } from "react-router-dom";
import type { Ingresso } from "../types/ingressos";

export default function Ingressos() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadIngressos() {
      const data = await getIngressos();
      setIngressos(data);
    }

    void loadIngressos();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <input className="search" placeholder="Buscar ingresso..." />

        <div className="section-title">
          <h3>Ingressos Disponíveis</h3>
        </div>

        <div className="news-grid">
          {ingressos.map((ingresso) => {
            const gameDate = new Date(ingresso.dateTime);

            return (
              <div className="card" key={ingresso.id}>
                <div className="card-content">
                  <h3>{ingresso.title}</h3>
                  <p>
                    <strong>Adversário:</strong> {ingresso.opponent}
                  </p>
                  <p>
                    <strong>Local:</strong> {ingresso.location}
                  </p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {gameDate.toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <strong>Horário:</strong>{" "}
                    {gameDate.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="price">
                    <strong>Valor:</strong> R$ {ingresso.valor}
                  </p>
                  <button
                    className="btn-produto"
                    onClick={() => navigate(`/ingressos/${ingresso.id}`)}
                  >
                    Comprar ingresso
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}