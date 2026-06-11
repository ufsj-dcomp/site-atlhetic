import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaBoxOpen } from "react-icons/fa";
import { ProductsTable } from "../../components/ProductsTable";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useProducts } from "../../hooks/useProducts";
import "../../styles/adminProducts.css";

export function AdminProducts() {
  const navigate = useNavigate();
  const { products, loading, error, setProducts } = useProducts();
  const { removeProduct, loading: deletingLoading, error: deleteError } =
    useDeleteProduct();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja remover este produto?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await removeProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">
        <div className="admin-products-header">
          <div className="admin-products-title-block">
            <div className="admin-products-icon">
              <FaBoxOpen />
            </div>
            <div>
              <h1>Gerenciar Produtos</h1>
              <p>Cadastre, edite e remova itens da loja.</p>
            </div>
          </div>

          <Link to="/admin/produtos/criar" className="admin-button admin-button-primary">
            <FaPlus /> Novo produto
          </Link>
        </div>

        {(error || deleteError) && (
          <div className="admin-products-alert">
            {error ?? deleteError}
          </div>
        )}

        {loading ? (
          <div className="admin-products-empty">Carregando produtos...</div>
        ) : (
          <ProductsTable
            products={products}
            onEdit={(id) => navigate(`/admin/produtos/${id}/editar`)}
            onDelete={handleDelete}
            deletingId={deletingLoading ? deletingId : null}
          />
        )}
      </div>
    </div>
  );
}