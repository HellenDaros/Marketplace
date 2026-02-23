import { ProductCard } from "@/components/product-card";
import { SearchForm } from "@/components/search-form";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import axios from "axios";
import { getProducts } from "../(produ)/products/products.service";
import FilterSelect from "@/components/filter-select";

interface HomeProps {
  searchParams: Promise<{
    title?: string;
    categories?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const products = await getProducts({
    title: params.title,
    categories: params.categories,
  });

  console.log("Produtos filtrados:", products);

  return (
    <main className="px-[168px] py-8 box-border">
      <div className=" flex flex-col pb-10 gap-2">
        <h1 className="text-2xl font-extrabold">Seus produtos</h1>
        <p>Acesse gerencie a sua lista de produtos à venda</p>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-10">
        <aside className="sticky rounded-2xl bg-zinc-100 p-6 h-fit">
          <h2 className="text-lg font-semibold mb-6 text-pink-500">Filtrar</h2>
          <SearchForm />
          <div className="py-6">
            <h2 className="text-lg font-semibold mb-6 text-pink-500">
              Categoria
            </h2>
            <FilterSelect />
          </div>
        </aside>

        <section>
          {!products || products.length === 0 ? (
            <p className="text-sm text-zinc-500">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
  // } catch (error) {
  //   console.log(error);
  //   return <span>Erro ao listar produtos</span>;
  // }
}
