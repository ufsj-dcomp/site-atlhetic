import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";

import "../styles/Home.css";

import { getNews } from "../../news/services/newsService";

import type { NewsData } from "../../news/types/news";

type News = NewsData & {
  id: string;
};

export default function Home() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();

        setNews(data as News[]);
      } catch (error) {
        console.error(error);
      }
    }

    loadNews();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="hero-section">
          <img
            src="/titulo.jpeg"
            className="hero-image"
          />

          <div className="hero-overlay">
            <span className="highlight">
              Destaque
            </span>

          <div className="logo-section">
            <h1>Athletic Clube</h1>
          </div>

            <p>
              Acompanhe notícias, jogos e
              novidades do clube.
            </p>
          </div>
        </div>

        <div className="section-header">
          <div>
            <h2>
              Últimas notícias
            </h2>

            <p>
              Fique por dentro das novidades
              do Athletic Clube
            </p>
          </div>

          <Link
            to="/noticias"
            className="view-all"
          >
            Ver todas
          </Link>
        </div>

        <div className="news-grid">
          {news.slice(0, 3).map((item) => (
            <div
              className="news-card"
              key={item.id}
            >
              <img
                src={
                  item.image ||
                  "/noticia1.jpg"
                }
                className="news-image"
              />

              <div className="news-content">
                <span className="news-tag">
                  Athletic
                </span>

                <h3>
                  {item.title}
                </h3>

                <p className="news-date">
                  {item.publishedAt?.toDate
                    ? item.publishedAt
                        .toDate()
                        .toLocaleDateString(
                          "pt-BR"
                        )
                    : "Sem data"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}