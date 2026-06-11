import { useState, type ChangeEvent } from "react";
import type { ProductFormValues } from "../types/products";

type FormErrors = Partial<Record<keyof ProductFormValues, string>>;

const defaultProductFormValues: ProductFormValues = {
  name: "",
  price: "",
  image: "",
  category: "",
  available: true,
  description: "",
};

export function useProductForm(
  initialValues: ProductFormValues = defaultProductFormValues
) {
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = event.target;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";

    setValues((current) => ({
      ...current,
      [target.name]: isCheckbox ? target.checked : target.value,
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
    if (!currentValues.category.trim()) nextErrors.category = "Informe a categoria.";
    if (!currentValues.description.trim()) nextErrors.description = "Informe a descrição.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function reset(nextValues: ProductFormValues = defaultProductFormValues) {
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