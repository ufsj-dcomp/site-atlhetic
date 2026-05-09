import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <style>
        {`
          /* ESTILOS DA SIDEBAR */
          .sidebar {
            width: 240px;
            background: #0a0a0a;
            height: 100vh;
            padding: 20px 16px;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            z-index: 100;
            transition: all 0.3s ease;
          }

          .sidebar h2 {
            color: #ffffff;
            margin-bottom: 40px;
            margin-top: 0;
            font-size: 20px;
            text-align: center;
            padding-bottom: 16px;
            border-bottom: 1px solid #333;
          }

          .menu-item {
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 12px;
            cursor: pointer;
            color: #e0e0e0;
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 15px;
            transition: all 0.2s ease;
          }

          .menu-item:hover {
            background: #1a1a1a;
            color: white;
          }

          .menu-item.active {
            background: #1F6E3C;
            color: white;
            font-weight: 500;
          }

          /* RESPONSIVO: em telas pequenas, sidebar vira barra inferior */
          @media (max-width: 768px) {
            .sidebar {
              width: 100%;
              height: auto;
              position: fixed;
              bottom: 0;
              top: auto;
              left: 0;
              right: 0;
              background: #0a0a0a;
              padding: 8px 12px;
              flex-direction: row;
              justify-content: space-around;
              border-top: 1px solid #222;
              box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
            }

            .sidebar h2 {
              display: none;
            }

            .menu-item {
              flex-direction: column;
              padding: 8px 12px;
              gap: 4px;
              font-size: 11px;
              margin-bottom: 0;
              border-radius: 8px;
              text-align: center;
            }

            .menu-item span:first-child {
              font-size: 20px;
            }

            /* Ajuste para o conteúdo não ficar escondido atrás da sidebar no mobile */
            .content {
              margin-left: 0 !important;
              margin-bottom: 70px !important;
              padding: 20px !important;
            }
          }

          /* Ajuste para telas muito pequenas */
          @media (max-width: 480px) {
            .menu-item {
              padding: 6px 8px;
              font-size: 10px;
            }
            
            .menu-item span:first-child {
              font-size: 18px;
            }
          }
        `}
      </style>

      <div className="sidebar">
        <h2>Athletic Clube</h2>

        <a href="/home" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/home" ? "active" : ""}`}>
            <span>🏠</span>
            <span>Home</span>
          </div>
        </a>

        <a href="/noticias" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/noticias" ? "active" : ""}`}>
            <span>📰</span>
            <span>Notícias</span>
          </div>
        </a>

        <a href="/jogos" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/jogos" ? "active" : ""}`}>
            <span>⚽</span>
            <span>Jogos</span>
          </div>
        </a>

        <a href="/loja" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/loja" ? "active" : ""}`}>
            <span>🛒</span>
            <span>Loja</span>
          </div>
        </a>

        <a href="/ingressos" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/ingressos" ? "active" : ""}`}>
            <span>🎫</span>
            <span>Ingressos</span>
          </div>
        </a>

        <a href="/perfil" style={{ textDecoration: "none" }}>
          <div className={`menu-item ${currentPath === "/perfil" ? "active" : ""}`}>
            <span>👤</span>
            <span>Perfil</span>
          </div>
        </a>
      </div>
    </>
  );
}