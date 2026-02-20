import z from "zod";

export const categoriesEnum = z.enum(
  ["Móvel", "Roupa", "Brinquedo", "Utensílio"],
  {
    message: "Selecione uma categoria válida",
  },
);

export const productSchema = z.object({
  title: z.string().min(2, { message: "Informe o título" }),
  price: z.string().min(1, { message: "O preço mínimo é R$ 1,00" }),
  description: z.string().min(1, { message: "Preencha uma descrição" }),
  categories: categoriesEnum,
  image: z.any(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categoriesEnum>;
