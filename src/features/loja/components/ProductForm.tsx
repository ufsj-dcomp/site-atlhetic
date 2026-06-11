import type { ChangeEvent, SyntheticEvent } from "react";
import type { ProductFormValues } from "../types/products";
import "../styles/adminProductsForm.css";
import "../styles/adminProductsPage.css";

interface ProductFormProps {
  values: ProductFormValues;
  errors: Partial<Record<keyof ProductFormValues, string>>;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  loading?: boolean;
  submitLabel: string;
  onCancel?: () => void;
}

export function ProductForm({
  values,
  errors,
  onChange,
  onSubmit,
  loading = false,
  submitLabel,
  onCancel,
}: ProductFormProps) {
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);
  }

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div className="admin-product-field">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" value={values.name} onChange={onChange} />
        {errors.name && <span className="admin-product-error">{errors.name}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="price">Preço</label>
        <input
          id="price"
          name="price"
          value={values.price}
          onChange={onChange}
          inputMode="decimal"
        />
        {errors.price && <span className="admin-product-error">{errors.price}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="image">Imagem</label>
        <input id="image" name="image" value={values.image} onChange={onChange} />
        {errors.image && <span className="admin-product-error">{errors.image}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="category">Categoria</label>
        <input
          id="category"
          name="category"
          value={values.category}
          onChange={onChange}
        />
        {errors.category && (
          <span className="admin-product-error">{errors.category}</span>
        )}
      </div>

      <div className="admin-product-field">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={onChange}
          rows={4}
        />
        {errors.description && (
          <span className="admin-product-error">{errors.description}</span>
        )}
      </div>

      <label className="admin-product-checkbox">
        <input
          type="checkbox"
          name="available"
          checked={values.available}
          onChange={onChange}
        />
        Produto disponível
      </label>

      <div className="admin-product-actions">
        {onCancel && (
          <button
            type="button"
            className="admin-button admin-button-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="admin-button admin-button-primary"
          disabled={loading}
        >
          {loading ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}