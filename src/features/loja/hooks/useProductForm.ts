import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  emptyProductFormValues,
  type ProductFormValues,
} from "../types/products";

type FormErrors = Partial<Record<keyof ProductFormValues, string>>;

export function useProductForm(
  initialValues: ProductFormValues = emptyProductFormValues
) {
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate(currentValues: ProductFormValues = values) {
    const nextErrors: FormErrors = {};

    if (!currentValues.name.trim()) nextErrors.name = "Informe o nome.";
    if (!currentValues.price.trim()) nextErrors.price = "Informe o preço.";
    if (Number.isNaN(Number(currentValues.price))) {
      nextErrors.price = "O preço precisa ser um número.";
    }
    if (!currentValues.image.trim()) nextErrors.image = "Informe a imagem.";
    if (!currentValues.category.trim()) {
      nextErrors.category = "Informe a categoria.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function reset(nextValues: ProductFormValues = emptyProductFormValues) {
    setValues(nextValues);
    setErrors({});
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    validate,
    reset,
  };
}