import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../../pages/Sidebar";

import { getProductById } from "../services/products";

import "./ProdutoDetalhe.css";

export default function ProdutoDetalhe() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const data = await getProductById(id);

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return <h1>Carregando...</h1>;
  }

  function nextImage() {
    if (!product.images) return;

    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage() {
    if (!product.images) return;

    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="produto-container">
        <h1>{product.name}</h1>

        <h2>R$ {product.price}</h2>

        <p>{product.description}</p>

        <div className="produto-carousel">
          <button
            className="seta-btn"
            onClick={prevImage}
          >
            ←
          </button>

          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="produto-imagem"
          />

          <button
            className="seta-btn"
            onClick={nextImage}
          >
            →
          </button>
        </div>

        <button className="comprar-btn">
          Comprar
        </button>
      </div>
    </div>
  );
}