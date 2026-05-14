import { useEffect, useState } from "react";

import Sidebar from "../../../components/Sidebar";

import "../styles/News.css";

import { getNews } from "../services/newsService";

import type { NewsData } from "../types/news";

type News = NewsData & {
  id: string;
};

export default function News() {
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
        <h1 className="news-page-title">
          Notícias
        </h1>

        <div className="news-grid">
          {news.map((item) => (
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
                alt={item.title}
              />

              <div className="news-body">
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

                <button className="read-more">
                  Ler mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}