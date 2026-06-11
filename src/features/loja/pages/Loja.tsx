import { useEffect, useState } from "react";
import { getProducts } from "../services/products"; 
import Sidebar from "../../../components/Sidebar";
import "../styles/Loja.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext"; 
import type { Product } from "../types/products";


export default function Loja() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data as Product[]); 
    }

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`); 
  };

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
                    onClick={() => navigate(`/produto/${product.id}`)}
                  >
                    Ver produto
                  </button>

                  <button
                      className="btn-produto"
                      style={{ backgroundColor: '#1F6E3C', color: 'white' }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Comprar
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