import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DetalheJogo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const jogos = [
    {
      id: 1,
      adversario: "FC Unidos",
      data: "08/05/2026",
      horario: "16:00",
      local: "Estádio Municipal",
    },
    {
      id: 2,
      adversario: "Sporting Cidade",
      data: "15/05/2026",
      horario: "18:30",
      local: "Arena do Povo",
    },
    {
      id: 3,
      adversario: "Atlético Estrela",
      data: "22/05/2026",
      horario: "20:00",
      local: "Estádio Municipal",
    },
    {
      id: 4,
      adversario: "FC Campinas",
      data: "29/05/2026",
      horario: "17:00",
      local: "Arena Athletic",
    },
    {
      id: 5,
      adversario: "Real FC",
      data: "05/06/2026",
      horario: "19:00",
      local: "Estádio Municipal",
    },
  ];

  const jogo = jogos.find(
    (j) => j.id === Number(id)
  );

  if (!jogo) {
    return <h1>Jogo não encontrado</h1>;
  }

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

        .content {
            margin-left: 285px;
            padding: 40px;
            flex: 1;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            }

        .back-link {
          background: transparent;
          border: none;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 10px;
          padding: 0;
        }

        .back-link:hover {
          color: #1F6E3C;
        }

        .page-title {
          margin-top: 0;
          margin-bottom: 25px;
          font-size: 24px;
        }

        .game-details {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          max-width: 900px;
          box-sizing: border-box;
        }

        .top-section {
          background: linear-gradient(
            135deg,
            #1F6E3C,
            #14532d
          );

          color: white;
          padding: 40px;
          position: relative;
        }

        .status {
          position: absolute;
          top: 20px;
          right: 20px;

          background: rgba(255,255,255,0.2);

          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
        }

        .teams {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .team {
          text-align: center;
          flex: 1;
        }

        .logo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #e9ecef;
          color: #1F6E3C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
          margin: auto;
          margin-bottom: 15px;
        }

        .team h2 {
          margin: 0;
          font-size: 18px;
        }

        .vs {
          font-size: 42px;
          font-weight: bold;
          padding: 0 30px;
        }

        .info-section {
          padding: 35px;
        }

        .info-title-main {
          font-size: 18px;
          margin-bottom: 25px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .info-card {
          background: #f7f7f7;
          border-radius: 14px;
          padding: 20px;
        }

        .info-label {
          color: #666;
          font-size: 18px;
          margin-bottom: 14px;

          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-box {
          width: 36px;
          height: 36px;

          border-radius: 10px;

          background: #e7efe9;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }

        .info-value {
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }

        .local-text {
          font-size: 18px;
          font-weight: 600;
          color: #666;
    
        }

        @media (max-width: 768px) {
        .content {
            margin: 0;
            padding: 20px;

            
        }

        .game-details {
            width: 100%;
            max-width: 100%;
        }

        .teams {
            flex-direction: column;
            gap: 25px;
        }

        .vs {
            padding: 0;
        }

        .info-grid {
            grid-template-columns: 1fr;
        }

        .top-section {
            padding: 30px 20px;
        }

        .info-section {
            padding: 25px 20px;
        }

        .status {
            position: static;
            display: inline-block;
            margin-bottom: 20px;
        }
        }
        `}
      </style>

      <div className="layout">
        <Sidebar />

        <div className="content">
          <button
            className="back-link"
            onClick={() => navigate("/jogos")}
          >
            ← Voltar
          </button>

          <h1 className="page-title">
            Detalhes do Jogo
          </h1>

          <div className="game-details">
            <div className="top-section">
    

              <div className="teams">
                <div className="team">
                  <div className="logo">
                    AC
                  </div>

                  <h2>Athletic Clube</h2>
                </div>

                <div className="vs">
                  VS
                </div>

                <div className="team">
                  <div className="logo">
                    ?
                  </div>

                  <h2>
                    {jogo.adversario}
                  </h2>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2 className="info-title-main">
                Informações da Partida
              </h2>

              <div className="info-grid">
                <div className="info-card">
                  <div className="info-label">
                    <span className="icon-box">📅</span>
                    Data
                  </div>

                  <div className="info-value">
                    {jogo.data}
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-label">
                    <span className="icon-box">⏰</span>
                    Horário
                  </div>

                  <div className="info-value">
                    {jogo.horario}
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-label">
                    <span className="icon-box">📍</span>
                    Local
                  </div>

                  <div className="local-text">
                    {jogo.local}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}