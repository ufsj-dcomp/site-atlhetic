import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ProductForm } from "../../components/ProductForm";
import { useProductById } from "../../hooks/useProductById";
import { useProductForm } from "../../hooks/useProductForm";
import { updateProduct } from "../../services/products";
import type { Product } from "../../types/products";
import "../../styles/adminProductsPage.css";
import "../../styles/adminProductsForm.css";

function EditProductForm({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate, setErrors } = useProductForm({
    name: product.name,
    price: String(product.price),
    image: product.image,
    category: product.category,
    available: product.available,
    description: product.description,
  });

  const [saving, setSaving] = useState(false);

  async function handleSubmit(formValues: typeof values) {
    const isValid = validate(formValues);
    if (!isValid) return;

    setSaving(true);

    try {
      await updateProduct(product.id, formValues);
      navigate("/admin/produtos");
    } catch {
      setErrors((current) => ({
        ...current,
        name: current.name ?? "Erro ao atualizar produto.",
      }));
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProductForm
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={saving}
      submitLabel="Salvar alterações"
    />
  );
}

export function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProductById(id);

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="admin-products-container">
          <div className="admin-products-empty">Carregando produto...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-products-page">
        <div className="admin-products-container">
          <div className="admin-products-alert">{error}</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/admin/produtos" replace />;
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">
        <div className="admin-products-header">
          <div className="admin-products-header-left">
            <h1>Editar Produto</h1>
            <p>Atualize as informações do item.</p>
          </div>

          <button
            type="button"
            className="admin-button admin-button-back"
            onClick={() => navigate("/admin/produtos")}
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>

        <EditProductForm product={product} />
      </div>
    </div>
  );
}