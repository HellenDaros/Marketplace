import Image from "next/image";
import { Metadata } from "next";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import {
  getProduct,
  getProducts,
  getProductss,
} from "@/app/(store)/(produ)/products/products.service";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/product-form";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  try {
    const idProduct = (await params).id;
    console.log(idProduct);
    const product = await getProductss(idProduct);

    console.log("Produto recebido:", product);

    return (
      <div className="w-full flex justify-center mt-16">
        <div className="w-full max-w-6xl flex  gap-60 items-baseline px-6">
          {/* COLUNA ESQUERDA */}
          <div className="flex-1">
            <div className="scale-110 origin-top-left">
              <ProductCard product={product} />
            </div>
          </div>
          {/* <div className="col-span-2 overflow-hidden ">
          <Image
            src={product.image}
            alt=""
            width={1000}
            height={1000}
            quality={100}
          />
        </div>

        <div className="flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-sm text-zinc-400">
              {(product.price / 12).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      
    ); */}
          <div className="w-40 flex justify-end gap-4">
            <Link href={`/products/${product.id}/edit`}>
              <Button>Editar</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <span>Erro ao carregar produto</span>;
  }
}
