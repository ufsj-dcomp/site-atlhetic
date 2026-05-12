import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Jogos() {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const jogos = [
    {
      id: 1,
      adversario: "FC Unidos",
      data: "08/05/2026",
      hora: "16:00",
      local: "Estádio Municipal",
      destaque: true,
    },
    {
      id: 2,
      adversario: "Sporting Cidade",
      data: "15/05/2026",
      hora: "18:30",
      local: "Estádio Municipal",
    },
    {
      id: 3,
      adversario: "Atlético Estrela",
      data: "22/05/2026",
      hora: "20:00",
      local: "Estádio Municipal",
    },
    {
      id: 4,
      adversario: "FC Campinas",
      data: "29/05/2026",
      hora: "17:00",
      local: "Estádio Municipal",
    },
    {
      id: 5,
      adversario: "Real FC",
      data: "05/06/2026",
      hora: "19:00",
      local: "Estádio Municipal",
    },
  ];

  // FILTRO
  const jogosFiltrados = jogos.filter((jogo) =>
    jogo.adversario
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <>
      <style>
        {`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
        }

        .layout {
          display: flex;
        }

        /* CONTEÚDO */
        .content {
          margin-left: 240px;
          padding: 30px 60px;
          flex: 1;
        }

        h1 {
          margin-bottom: 20px;
        }

        .search {
          width: 100%;
          padding: 12px;
          border-radius: 20px;
          border: none;
          background: #eee;
          margin-bottom: 25px;
          box-sizing: border-box;
          font-size: 14px;
        }

        .search:focus {
          outline: none;
          background: #e0e0e0;
        }

        /* RESULTADO */
        .resultado-busca {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }

        /* CARD */
        .game-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: 0.2s;
        }

        .game-card:hover {
          transform: translateY(-2px);
        }

        .game-card.highlight {
          border: 2px solid #1F6E3C;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo {
          width: 50px;
          height: 50px;
          background: #1F6E3C;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }

        .middle {
          text-align: center;
          font-weight: bold;
          font-size: 18px;
        }

        .right {
          text-align: right;
        }

        .badge {
          background: #1F6E3C;
          color: white;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 12px;
          margin-bottom: 10px;
          display: inline-block;
        }

        .sem-resultados {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 12px;
          color: #666;
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .content {
            margin-left: 0;
            padding: 20px;
          }

          .game-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .right {
            text-align: left;
          }
        }
        `}
      </style>

      <div className="layout">
        <Sidebar />

        <div className="content">
          <h1>Próximos Jogos</h1>

          <input
            className="search"
            type="text"
            placeholder="Buscar Jogos"
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />

          {busca && (
            <div className="resultado-busca">
              🔍 Mostrando resultados para:
              <strong> "{busca}"</strong>
            </div>
          )}

          {jogosFiltrados.length === 0 ? (
            <div className="sem-resultados">
              ⚽ Nenhum jogo encontrado para "
              {busca}"
            </div>
          ) : (
            jogosFiltrados.map((jogo, index) => (
              <div
                key={index}
                className={`game-card ${
                  jogo.destaque ? "highlight" : ""
                }`}
                onClick={() =>
                  navigate(`/jogo/${jogo.id}`)
                }
              >
                <div>
                  {jogo.destaque && (
                    <div className="badge">
                      Próximo Jogo
                    </div>
                  )}

                  <div className="left">
                    <div className="logo">AC</div>

                    <div>
                      <strong>
                        Athletic Clube
                      </strong>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 12,
                          color: "#666",
                        }}
                      >
                        {jogo.local}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="middle">
                  VS
                </div>

                <div className="right">
                  <strong>
                    {jogo.adversario}
                  </strong>

                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: 13,
                    }}
                  >
                    {jogo.data}
                  </p>

                  <p
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: 13,
                      color: "#666",
                    }}
                  >
                    {jogo.hora}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}