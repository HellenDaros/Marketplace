import { Product } from "@/data/types/product";
import Image from "next/image";
import { formatCurrency } from "@/utils/format-currency";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className=" bg-zinc-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition">
        {/* Imagem */}
        <div className="relative h-56 overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
              ANUNCIADO
            </span>
            <span className="bg-zinc-700 text-white text-xs px-3 py-1 rounded-full">
              {product.categories}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-pink-500 font-semibold">
              {product.title}
            </h2>

            <span className="text-lg font-bold text-pink-400">
              R$ {formatCurrency(product.price)}
            </span>
          </div>

          <p className="text-sm text-pink-400 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
