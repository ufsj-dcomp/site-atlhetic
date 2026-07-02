import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaUserShield,
  FaNewspaper,
  FaBoxOpen,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import { SalesReportTab } from "../components/SalesReportTab";
import "../styles/AdminHome.css";

export function AdminHome() {
  const [activeTab, setActiveTab] = useState<"features" | "reports">(
    "features"
  );

  const adminFeatures = [
    {
      id: "create-game",
      title: "Cadastrar Novo Jogo",
      description:
        "Adicione uma nova partida, definindo modalidade, data e local.",
      icon: <FaPlus />,
      path: "/admin/cadastrar-jogo",
      colorBg: "#e0f2fe",
      colorIcon: "#0284c7",
    },
    {
      id: "edit-games",
      title: "Editar Jogos Existentes",
      description:
        "Altere informações, atualize placares ou cancele partidas cadastradas.",
      icon: <FaEdit />,
      path: "/admin/gerenciar-jogos",
      colorBg: "#fef08a",
      colorIcon: "#ca8a04",
    },
    {
      id: "publish-news",
      title: "Publicar Novas Notícias",
      description: "Publique novas notícias sobre o Athletic Club",
      icon: <FaNewspaper />,
      path: "/admin/cadastrar-noticias",
      colorBg: "#b2b5b6ff",
      colorIcon: "#1f1e1eff",
    },
    {
      id: "manage-products",
      title: "Gerenciar Produtos",
      description: "Cadastre, edite e remova itens da loja.",
      icon: <FaBoxOpen />,
      path: "/admin/produtos",
      colorBg: "#dcfce7",
      colorIcon: "#166534",
    },
    {
      id: "manage-orders",
      title: "Gerenciar Pedidos",
      description: "Consulte pedidos e atualize o status de cada venda.",
      icon: <FaClipboardList />,
      path: "/admin/pedidos",
      colorBg: "#fee2e2",
      colorIcon: "#b91c1c",
    },
  ];

  return (
    <div className="admin-home-page">
      <div className="admin-container">
        <div className="admin-header">
          <div
            style={{ fontSize: "2.5rem", color: "#111", marginBottom: "10px" }}
          >
            <FaUserShield />
          </div>
          <h1>Painel Administrativo</h1>
          <p>Gerencie as funcionalidades do site</p>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab-button ${
              activeTab === "features" ? "admin-tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("features")}
          >
            Funcionalidades
          </button>

          <button
            type="button"
            className={`admin-tab-button ${
              activeTab === "reports" ? "admin-tab-button-active" : ""
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <FaChartBar /> Relatórios
          </button>
        </div>

        {activeTab === "features" && (
          <div className="admin-grid">
            {adminFeatures.map((feature) => (
              <Link
                to={feature.path}
                key={feature.id}
                className="admin-card-link"
              >
                <div className="admin-card">
                  <div
                    className="card-icon-wrapper"
                    style={{
                      backgroundColor: feature.colorBg,
                      color: feature.colorIcon,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "reports" && <SalesReportTab />}
      </div>
    </div>
  );
}