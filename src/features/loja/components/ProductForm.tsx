import type { ChangeEvent } from "react";
import type { ProductFormValues } from "../types/products";
import "../styles/adminProducts.css";

interface ProductFormProps {
  values: ProductFormValues;
  errors: Partial<Record<keyof ProductFormValues, string>>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(values);
  }

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div className="admin-product-field">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Ex: Garrafa Térmica"
        />
        {errors.name && <span className="admin-product-error">{errors.name}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="price">Preço</label>
        <input
          id="price"
          name="price"
          value={values.price}
          onChange={onChange}
          placeholder="Ex: 99"
          inputMode="decimal"
        />
        {errors.price && <span className="admin-product-error">{errors.price}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="image">Imagem</label>
        <input
          id="image"
          name="image"
          value={values.image}
          onChange={onChange}
          placeholder='Ex: "/garrafatermica.webp" ou URL completa'
        />
        {errors.image && <span className="admin-product-error">{errors.image}</span>}
      </div>

      <div className="admin-product-field">
        <label htmlFor="category">Categoria</label>
        <input
          id="category"
          name="category"
          value={values.category}
          onChange={onChange}
          placeholder="Ex: acessorios"
        />
        {errors.category && (
          <span className="admin-product-error">{errors.category}</span>
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