import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../lib/firebase";
import Sidebar from "../../../components/Sidebar";

import type { Order } from "../types/order";
import "../styles/OrderSummary.css";


export default function OrderSummary() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));

      console.log("Quantidade de pedidos:", querySnapshot.size);

      if (querySnapshot.empty) {
        console.log("Nenhum pedido encontrado no Firebase");
        setLoading(false);
        return;
      }

      const firstDoc = querySnapshot.docs[0];
      const data = firstDoc.data();

      console.log("Pedido encontrado:", data);

      setOrder({
        id: firstDoc.id,
        userId: data.userId || "",
        status: data.status || "",
        total: data.total || 0,
        items: Array.isArray(data.items) ? data.items : [],
      });
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="order-layout">
        <Sidebar />
        <div className="order-content">
          <h1>Carregando pedido...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="order-layout">
      <Sidebar />

      <div className="order-content">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <h1 className="order-title">
          Resumo do Pedido
        </h1>

        {!order ? (
          <div className="order-card">
            <p>Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <>
            <div className="order-card">
              <div className="order-header">
                <h2>Itens da Compra</h2>
              </div>

              {order.items.length === 0 ? (
                <p>Pedido sem itens.</p>
              ) : (
                order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div>
                      <h3>{item.name}</h3>
                      <p>Quantidade: {item.quantity}</p>
                    </div>

                    <strong>
                                            R${" "}
                      {(parseFloat(String(item.price)) * Number(item.quantity)).toFixed(2)}
                    </strong>
                  </div>
                ))
              )}

              <div className="order-total">
                <span>Total</span>

                <strong>
                  {typeof order.total === "number"
                    ? `R$ ${order.total.toFixed(2)}`
                    : order.total}
                </strong>
              </div>
            </div>

            <button
              className="continue-button"
              onClick={() => navigate("/pagamento")}
            >
              Escolher Forma de Pagamento
            </button>
          </>
        )}
      </div>
    </div>
  );
}