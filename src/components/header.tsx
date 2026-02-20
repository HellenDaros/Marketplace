import Image from "next/image";
import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import Logo from "/Logo.png";

export function Header() {
  return (
    <header className="flex items-center justify-between py-5 px-5 border-b max-w-screen border-zinc-200">
      <div className="flex items-center gap-5">
        <Image
          src={"/Logo.png"}
          className="h-6 w-6"
          width={24}
          height={24}
          alt=""
        />
      </div>
      <div className="inline-flex items-center text-center gap-1 rounded-md bg-amber-50 px-2 py-1 border-amber-50">
        <Box className="h-6 w-6 text-pink-500" />
        <span className="text-lg font-semibold text-pink-500">Produtos</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button>
              <Plus className="h-5 w-5" />
              Novo produto
            </Button>
          </Link>
        </div>

        <Image
          src="/menina.png"
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          alt=""
        />
      </div>
    </header>
  );
}
