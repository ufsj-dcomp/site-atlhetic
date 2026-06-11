import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../../components/ProductForm";
import { useProductById } from "../../hooks/useProductById";
import { useProductForm } from "../../hooks/useProductForm";
import { productToFormValues, type Product } from "../../types/products";
import { updateProduct } from "../../services/products";
import "../../styles/adminProducts.css";

function EditProductForm({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate, setErrors } =
    useProductForm(productToFormValues(product));
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
      onCancel={() => navigate("/admin/produtos")}
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
    navigate("/admin/produtos");
    return null;
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">
        <div className="admin-products-header">
          <div>
            <h1>Editar Produto</h1>
            <p>Atualize as informações do item.</p>
          </div>
        </div>

        <EditProductForm product={product} />
      </div>
    </div>
  );
}