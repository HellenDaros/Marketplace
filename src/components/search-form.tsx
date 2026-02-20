"use client";

import { getProducts } from "@/app/(store)/(produ)/products/products.service";
import { Product } from "@/data/types/product";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import z from "zod";
import { set } from "zod/v4-mini";

export function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [products, setProducts] = useState<Product[] | undefined>([]);
  const queryTitle = searchParams.get("title") ?? "";
  const [search, setSearch] = useState(queryTitle);

  useEffect(() => {
    // async function fetchProducts() {
    //   const data = await getProducts({ title });
    // async function fetchProducts() {
    //   try {
    //     const products = await getProducts({ title: queryTitle });
    // setProducts(products);
    //   } catch (error) {
    //     console.error("Erro ao buscar produtos:", error);

    setSearch(queryTitle);
    // }
    // fetchProducts();
  }, [queryTitle]);

  function handleSearch(value: string) {
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    // event.preventDefault();

    // const formData = new FormData(event.currentTarget);

    // console.log("FormData", formData);

    // const data = Object.fromEntries(formData);

    // console.log("Dados do formulário:", data);

    // const query = data.q;

    // setSearch(data.q.toString());

    // if (!query) {
    //   return "Nenhum produto encontrado nessa pesquisa";
    // }
    // const filteredProducts = products?.filter((product) =>
    //   product.title.toLowerCase().includes(search.toLowerCase()),
    // );

    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <div
      //   onSubmit={handleSearch}
      className="flex items-center pb-1 gap-2 text-pink-300 border-b border-zinc-200"
    >
      <Search className="w-4 h-4 text-pink-500" />

      <input
        // name="q"
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        // defaultValue={queryTitle ?? ""}
        placeholder="Pesquisar..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-pink-300"
        required
      />
    </div>
  );
}
