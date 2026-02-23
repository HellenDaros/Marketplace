"use client";

import {
  productSchema,
  ProductSchemaType,
} from "@/app/(store)/(produ)/products/productSchema";
import { ErrorMessage } from "./ErrorMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Upload } from "./upload";
import {
  getProductss,
  postProducts,
  updateProduct,
} from "@/app/(store)/(produ)/products/products.service";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      if (!productId) return;

      try {
        const data = await getProductss(productId);
        reset({
          title: data.title ?? "",
          price: String(data.price ?? ""),
          description: data.description ?? "",
          categories: data.categories,
          image: undefined,
        });
        console.log("Produto carregado:", data);
      } catch (error) {
        console.error("Erro ao carregar produto");
      }
    }

    loadProduct();
  }, [productId, reset]);

  async function onSubmit(formData: ProductSchemaType) {
    try {
      let imageBase64 = "";
      console.log(formData.image);
      if (formData.image instanceof File) {
        imageBase64 = await fileToBase64(formData.image);
      }

      const dataToSend = {
        title: formData.title,
        price: formData.price,
        slug: formData.title,
        description: formData.description,
        categories: formData.categories,
        image: imageBase64,
      };

      if (productId) {
        await updateProduct(productId, dataToSend); // PUT
      } else {
        await postProducts(dataToSend); // POST
      }
      router.push("/");
    } catch (error) {
      throw new Error("Erro ao cadastrar produto");
    }
  }

  return (
    <main className="flex w-lg text-pink-500 flex-col md:flex-row bg-zinc-50 rounded-2xl px-8 py-8">
      <div className="flex-1 flex flex-col items-center gap-6 md:justify-center">
        <p className="w-full text-pink-500 max-w-sm font-bold text-3xl text-gray-900 mb-6 text-left">
          Dados do produto
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="signin-form"
          className="w-full flex flex-col space-y-6"
        >
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Upload
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
          />

          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="title">Título</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Nome do produto"
                  required
                />
                {errors?.title?.message && (
                  <ErrorMessage message={errors.title.message} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Valor</FieldLabel>
                <Input
                  id="price"
                  type="text"
                  placeholder="0,00"
                  {...register("price")}
                />

                <FieldDescription>R$</FieldDescription>
                {errors?.price?.message && (
                  <ErrorMessage message={errors.price.message} />
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Input
                id="description"
                type="text"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                {...register("description")}
              />
              {errors?.description?.message && (
                <ErrorMessage message={errors.description.message} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="categories">Categoria</FieldLabel>
              <Controller
                control={control}
                name="categories"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Móvel">Móvel</SelectItem>
                      <SelectItem value="Roupa">Roupa</SelectItem>
                      <SelectItem value="Brinquedo">Brinquedo</SelectItem>
                      <SelectItem value="Utensílio">Utensílio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.categories?.message && (
                <ErrorMessage message={errors.categories.message} />
              )}
            </Field>

            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancelar
              </Button>
              <Button form="signin-form" type="submit">
                Salvar e publicar
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
