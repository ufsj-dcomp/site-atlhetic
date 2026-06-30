import { useState, type ChangeEvent } from "react";
import type { ProductFormValues } from "../types/products";

type FormErrors = Partial<Record<keyof ProductFormValues, string>>;

const defaultProductFormValues: ProductFormValues = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  stock: "0",
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

    setValues((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  }

  function validate(currentValues: ProductFormValues = values) {
    const nextErrors: FormErrors = {};

    if (!currentValues.name.trim()) nextErrors.name = "Informe o nome.";

    if (!currentValues.price.trim()) {
      nextErrors.price = "Informe o preço.";
    } else if (Number.isNaN(Number(currentValues.price))) {
      nextErrors.price = "O preço precisa ser um número.";
    }

    if (!currentValues.image.trim()) nextErrors.image = "Informe a imagem.";
    if (!currentValues.category.trim()) nextErrors.category = "Informe a categoria.";
    if (!currentValues.description.trim()) nextErrors.description = "Informe a descrição.";

    if (!currentValues.stock.trim()) {
      nextErrors.stock = "Informe a quantidade em estoque.";
    } else if (!/^\d+$/.test(currentValues.stock.trim())) {
      nextErrors.stock = "O estoque precisa ser um número inteiro não negativo.";
    }

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