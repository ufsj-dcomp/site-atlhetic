import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../components/ProductForm";
import { createProduct } from "../../services/products";
import { useProductForm } from "../../hooks/useProductForm";
import "../../styles/adminProducts.css";

export function CreateProduct() {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate, setErrors } = useProductForm();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formValues: typeof values) {
    const isValid = validate(formValues);

    if (!isValid) return;

    setLoading(true);

    try {
      await createProduct(formValues);
      navigate("/admin/produtos");
    } catch {
      setErrors((current) => ({
        ...current,
        name: current.name ?? "Erro ao salvar produto.",
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-products-page">
      <div className="admin-products-container">
        <div className="admin-products-header">
          <div>
            <h1>Cadastrar Produto</h1>
            <p>Adicione um novo item para a loja.</p>
          </div>
        </div>

        <ProductForm
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Cadastrar produto"
          onCancel={() => navigate("/admin/produtos")}
        />
      </div>
    </div>
  );
}