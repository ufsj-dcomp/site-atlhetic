import type { Product } from "../types/products";
import "../styles/adminProductsTable.css";
import "../styles/adminProductsPage.css";

interface ProductsTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductsTable({
  products,
  onEdit,
  onDelete,
  deletingId,
}: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="admin-products-empty">
        Nenhum produto cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="admin-products-table-wrapper">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  className="admin-product-thumb"
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{currencyFormatter.format(product.price)}</td>
              <td>{product.stock}</td>
              <td>
                <span
                  className={`admin-product-badge ${
                    product.available
                      ? "admin-product-badge--on"
                      : "admin-product-badge--off"
                  }`}
                >
                  {product.available ? "Disponível" : "Indisponível"}
                </span>
              </td>
              <td>
                <div className="admin-product-row-actions">
                  <button
                    type="button"
                    className="admin-button admin-button-secondary"
                    onClick={() => onEdit(product.id)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="admin-button admin-button-danger"
                    onClick={() => onDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? "Removendo..." : "Remover"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}