import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { getProducts } from "../services/products";
import type { Product } from "../types/products";
import "../styles/Loja.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Loja() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data as Product[]);
    }

    void loadProducts();
  }, []);

  const visibleProducts = products.filter((product) => product.available);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <input
          className="search"
          placeholder="Buscar produto..."
        />

        <div className="section-title">
          <h3>Produtos</h3>
          <span style={{ color: "#1F6E3C", cursor: "pointer" }} />
        </div>

        <div className="news-grid">
          {visibleProducts.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="card-content">
                <p>{product.name}</p>
                <p>{currencyFormatter.format(product.price)}</p>

                <button
                  className="btn-produto"
                  onClick={() => navigate(`/produto/${product.id}`)}
                >
                  Ver produto
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <p style={{ marginTop: "24px" }}>
            Nenhum produto disponível no momento.
          </p>
        )}
      </div>
    </div>
  );
}