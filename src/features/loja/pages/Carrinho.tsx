import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext"; 
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { getProductById, decreaseProductStock } from "../services/products";
import "../styles/Carrinho.css";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);

  const valorTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleFinalizarCompra = async () => {
    if (cart.length === 0) return;

    setProcessing(true);
    setStockError(null);

    try {
      for (const item of cart) {
        const currentProduct = await getProductById(item.id);

        if (!currentProduct || currentProduct.stock < item.quantity) {
          setStockError(
            `Estoque insuficiente para "${item.name}". Disponível: ${currentProduct?.stock ?? 0}.`
          );
          setProcessing(false);
          return;
        }
      }

      for (const item of cart) {
        await decreaseProductStock(item.id, item.quantity);
      }

      clearCart();
      navigate("/resumo-pedido", {
        state: { items: cart, total: valorTotal },
      });
    } catch {
      setStockError("Não foi possível concluir a compra. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="carrinho-page">
      <div className="carrinho-container">
        
        <div className="carrinho-header">
          <FaShoppingBag size={24} />
          <h2>Meu Carrinho</h2>
        </div>

        {cart.length === 0 ? (
          <div className="carrinho-vazio">
            <p>Seu carrinho está vazio.</p>
            <button className="btn-voltar" onClick={() => navigate("/loja")}>
              Voltar para a Loja
            </button>
          </div>
        ) : (
          <>
            <div className="carrinho-lista">
              {cart.map((item) => (
                <div className="carrinho-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-categoria">{item.category}</p>
                    <p className="item-preco">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>

                  <div className="item-acoes">
                    <span className="item-quantidade">Qtd: {item.quantity}</span>
                    <button 
                      className="btn-remover" 
                      onClick={() => removeFromCart(item.id)}
                      title="Remover item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrinho-resumo">
              <h3>Resumo do Pedido</h3>
              <div className="resumo-linha">
                <span>Total:</span>
                <span className="resumo-total">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
              </div>

              {stockError && (
                <p className="carrinho-erro-estoque">{stockError}</p>
              )}

              <button
                className="btn-finalizar"
                onClick={handleFinalizarCompra}
                disabled={processing}
              >
                {processing ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}