import {
  productSchema,
  ProductSchemaType,
} from "@/app/(store)/(produ)/products/productSchema";
import { api } from "@/data/api";
import { ErrorTemplate } from "@/data/types/error-template";
import { Product } from "@/data/types/product";
import { AxiosError } from "axios";

interface FilteredProducts {
  title?: string | undefined | null;
}

// estamos dizendo que getProducts é uma função assíncrona que recebe um objeto do tipo FilteredProducts e retorna uma Promise que resolve para um array de Product.
// O objeto FilteredProducts tem uma propriedade opcional title, que pode ser uma string, undefined ou null.
// Se title for fornecido, a função irá filtrar os produtos com base no título. Se title não for fornecido, a função irá retornar todos os produtos.
// Caso nenhum filtro seja fornecido, instanciamos que a função recebe um objeto vazio, ou seja, getProducts({}), para garantir que a função funcione corretamente mesmo sem filtros.
export async function getProducts({ title }: FilteredProducts = {}): Promise<
  Product[]
> {
  try {
    const { data } = await api.get<Product[]>("/products", {
      params: {
        title: title,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
    console.log(error);
    throw new Error("Erro ao listar produtos");
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const { data } = await api.get<Product[]>(`/products`, {
      params: {
        id: id,
      },
    });
    console.log(id);
    console.log(data);
    return data[0];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
    throw new Error("Nenhum produto encontrado");
  }
}

export async function postProducts(product: any) {
  try {
    const { data } = await api.post("/products", product);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }

    throw new Error("Erro ao cadastrar produto");
  }
}

export async function updateProduct(id: string, product: any) {
  try {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
    throw new Error("Erro ao atualizar produto");
  }
}
