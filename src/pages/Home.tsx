import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <style>
        {`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
        }

        /* LAYOUT */
        .layout {
          position: relative;
        }

        /* SIDEBAR */
        .sidebar {
          width: 240px;
          background: black;
          color: white;
          height: 100vh;
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
        }

        .sidebar h2 {
          margin-bottom: 30px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          cursor: pointer;
        }

        .menu-item.active {
          background: #1F6E3C;
          font-weight: bold;
        }

        /* CONTEÚDO */
        .content {
          margin-left: 240px;
          padding: 20px 60px;
        }

        /* SEARCH */
        .search {
          width: 100%;
          padding: 12px;
          border-radius: 20px;
          border: none;
          background: #eee;
          margin-bottom: 20px;
        }

        /* BANNER */
        .banner {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .banner img {
          width: 100%;
          height: 320px;
          object-fit: cover;
        }

        .banner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .banner-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .banner-content h2 {
          margin: 5px 0;
        }

        .tag {
          background: #1F6E3C;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 12px;
          display: inline-block;
        }

        /* TÍTULO */
        .section-title {
          margin-top: 30px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* GRID */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        .card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .card-content {
          padding: 12px;
        }

        .card-content span {
          font-size: 12px;
          color: gray;
        }

        h2, h3, p {
          margin: 0;
        }

        /* RESPONSIVO */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .content {
            margin-left: 0;
            padding: 15px;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }

          .banner img {
            height: 200px;
          }
        }
        `}
      </style>

      <div className="layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h2 style={{ color: "white"}}>Athletic Clube</h2>

          <div className="menu-item active">Home</div>
          <div className="menu-item">Notícias</div>
          <div className="menu-item">Jogos</div>
          <Link to="/perfil" className="menu-item" style={{ textDecoration: "none", color: "white" }}>
            Perfil
          </Link>
        </div>

        {/* CONTEÚDO */}
        <div className="content">
        

          {/* BANNER */}
          <div className="banner">
            <img src="/titulo.jpeg" alt="banner" />
            <div className="banner-content">
              <div className="tag">Destaque</div>
              <h2  style={{ color: "white"}}>Athletic vence mais uma no campeonato</h2>
              <span>07 Abr 2026</span>
            </div>
          </div>

          {/* TÍTULO */}
          <div className="section-title">
            <h3>Últimas Notícias</h3>
            <span style={{ color: "#1F6E3C", cursor: "pointer" }}>
              Ver todas
            </span>
          </div>

          {/* NOTÍCIAS */}
          <div className="news-grid">
            <div className="card">
              <img src="/noticia1.jpg" alt="" />
              <div className="card-content">
                <span>07 Abr 2026</span>
                <p>Novo reforço chega ao Athletic</p>
              </div>
            </div>

            <div className="card">
              <img src="/time.jpg" alt="" />
              <div className="card-content">
                <span>06 Abr 2026</span>
                <p>Próximo jogo será no sábado</p>
              </div>
            </div>

            <div className="card">
              <img src="/noticia2.jpg" alt="" />
              <div className="card-content">
                <span>05 Abr 2026</span>
                <p>Time se prepara para decisão</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}