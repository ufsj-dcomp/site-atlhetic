import { useEffect, useState } from "react";
import { getProducts } from "../services/products"; 
import Sidebar from "../../../pages/Sidebar";
import "./Loja.css"
export default function Loja() {


  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <>

      <div className="layout">
        <Sidebar />

        <div className="content">
          <input
            className="search"
            placeholder="Buscar produto..."
          />

          

          <div className="section-title">
            <h3>Produtos</h3>
            <span style={{ color: "#1F6E3C", cursor: "pointer" }}>
            </span>
          </div>

                    <div className="news-grid">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="card-content">
                  <p>{product.name}</p>

                  <p>R$ {product.price}</p>

                  <button
                    className="btn-produto"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Ver produto
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}