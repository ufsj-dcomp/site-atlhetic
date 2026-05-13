import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Noticias() {
  const [busca, setBusca] = useState("");

  const noticias = [
    {
      categoria: "Futebol",
      titulo: "Athletic Clube vence clássico em partida emocionante",
      descricao:
        "Em jogo disputado no Estádio Municipal, time conquista vitória por 3x2 com gol nos acréscimos.",
      data: "10 Mai 2026",
      imagem: "/noticia1.jpg",
    },
    {
      categoria: "Contratação",
      titulo: "Novo atacante é anunciado oficialmente",
      descricao:
        "Athletic Clube confirma a contratação de jovem talento vindo do exterior para reforçar o elenco.",
      data: "09 Mai 2026",
      imagem: "/noticia2.jpg",
    },
    {
      categoria: "Torcida",
      titulo: "Torcida bate recorde de público no estádio",
      descricao:
        "Mais de 45 mil torcedores compareceram ao último jogo, estabelecendo novo recorde da temporada.",
      data: "08 Mai 2026",
      imagem: "/time.jpg",
    },
    {
      categoria: "Torcida",
      titulo: "Treino aberto à torcida neste final de semana",
      descricao:
        "Comissão técnica convida torcedores para acompanhar sessão de treinos e conhecer os jogadores.",
      data: "07 Mai 2026",
      imagem: "/titulo.jpeg",
    },
    {
      categoria: "Produtos",
      titulo: "Athletic Clube lança nova linha de uniformes",
      descricao:
        "Nova coleção já está disponível na loja oficial com design moderno e sustentável.",
      data: "06 Mai 2026",
      imagem: "/noticia1.jpg",
    },
    {
      categoria: "Futebol",
      titulo: "Equipe feminina avança para as semifinais",
      descricao:
        "Com vitória expressiva, time feminino garante vaga na próxima fase do campeonato estadual.",
      data: "05 Mai 2026",
      imagem: "/noticia2.jpg",
    },
  ];

  // FILTRO: busca por título, descrição ou categoria
  const noticiasFiltradas = noticias.filter((noticia) =>
    noticia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    noticia.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    noticia.categoria.toLowerCase().includes(busca.toLowerCase())
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

        .content {
          margin-left: 240px;
          padding: 40px;
          flex: 1;
        }

        .title {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          margin-bottom: 35px;
          font-size: 18px;
        }

        .search {
          width: 100%;
          max-width: 420px;

          padding: 14px 18px;

          border-radius: 16px;
          border: 1px solid #ddd;

          margin-bottom: 25px;

          font-size: 15px;

          box-sizing: border-box;
        }

        .search:focus {
          outline: none;
          border-color: #1F6E3C;
        }

        .resultado-busca {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .news-card {
          background: white;
          border-radius: 18px;

          overflow: hidden;

          box-shadow: 0 2px 8px rgba(0,0,0,0.08);

          transition: 0.2s;
        }

        .news-card:hover {
          transform: translateY(-4px);
        }

        .news-image {
          width: 100%;
          height: 210px;
          object-fit: cover;
        }

        .news-body {
          padding: 22px;
        }

        .tag {
          background: #1F6E3C;
          color: white;

          display: inline-block;

          padding: 6px 12px;

          border-radius: 20px;

          font-size: 12px;

          margin-bottom: 16px;
        }

        .news-title {
          font-size: 18px;
          line-height: 1.4;
          margin-bottom: 14px;
        }

        .news-description {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .news-date {
          color: #777;
          font-size: 13px;
        }

        .read-more {
          color: #1F6E3C;
          font-weight: bold;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
        }

        .sem-resultados {
          text-align: center;
          padding: 60px;
          background: white;
          border-radius: 18px;
          color: #666;
          grid-column: 1 / -1;
        }

        @media (max-width: 1100px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {

          .content {
            margin-left: 0;
            padding: 80px 16px 20px 16px;
          }

          .title {
            font-size: 32px;
          }

          .subtitle {
            font-size: 15px;
          }

          .news-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .news-image {
            height: 180px;
          }

          .news-body {
            padding: 18px;
          }

          .news-title {
            font-size: 16px;
          }

          .news-description {
            font-size: 13px;
          }
        }
        `}
      </style>

      <div className="layout">
        <Sidebar />

        <div className="content">
          <h1 className="title">
            Notícias
          </h1>

          <p className="subtitle">
            Fique por dentro das últimas novidades do Athletic Clube
          </p>

          <input
            className="search"
            type="text"
            placeholder="Buscar notícias por título, descrição ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          {busca && (
            <div className="resultado-busca">
              🔍 Mostrando resultados para: <strong>"{busca}"</strong>
            </div>
          )}

          <div className="news-grid">
            {noticiasFiltradas.length === 0 ? (
              <div className="sem-resultados">
                📰 Nenhuma notícia encontrada para "{busca}"
              </div>
            ) : (
              noticiasFiltradas.map((noticia, index) => (
                <div className="news-card" key={index}>
                  <img
                    src={noticia.imagem}
                    className="news-image"
                    alt={noticia.titulo}
                  />

                  <div className="news-body">
                    <div className="tag">
                      {noticia.categoria}
                    </div>

                    <div className="news-title">
                      {noticia.titulo}
                    </div>

                    <div className="news-description">
                      {noticia.descricao}
                    </div>

                    <div className="news-footer">
                      <span className="news-date">
                        {noticia.data}
                      </span>

                      <a className="read-more" href="#">
                        Ler mais →
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}