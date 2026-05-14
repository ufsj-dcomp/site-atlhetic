import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

import { getProductById } from "../services/products";

import "./ProdutoDetalhe.css";

export default function ProdutoDetalhe() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  const [currentImage, setCurrentImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [cep, setCep] = useState("");

  const [shipping, setShipping] = useState<number | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const data = await getProductById(id);

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  function nextImage() {
    if (!product?.images) return;

    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage() {
    if (!product?.images) return;

    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }

  function calculateShipping() {
    if (!cep) return;

    const fakeShipping = 25;

    setShipping(fakeShipping);
  }

  if (!product) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="produto-container">
        <div className="produto-content">

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

          <div className="produto-info">
            <h1>{product.name}</h1>

            <h2>R$ {product.price}</h2>

            <p>{product.description}</p>

            {product.category === "camisas" && (
              <div className="campo">
                <label>Tamanho</label>

                <select
                  value={selectedSize}
                  onChange={(e) =>
                    setSelectedSize(e.target.value)
                  }
                >
                  <option value="">
                    Selecione um tamanho
                  </option>

                  {product.tamanho.map(
                    (size: string, index: number) => (
                      <option
                        key={index}
                        value={size}
                      >
                        {size.toUpperCase()}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            <div className="campo">
              <label>Quantidade</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
              />
            </div>

            <div className="campo">
              <label>Consultar frete</label>

              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <button
                className="frete-btn"
                onClick={calculateShipping}
              >
                Consultar
              </button>

              {shipping && (
                <p>Frete: R$ {shipping}</p>
              )}
            </div>

            <button className="comprar-btn">
              Comprar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}