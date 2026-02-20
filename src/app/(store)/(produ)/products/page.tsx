import { ProductForm } from "@/components/product-form";

export default function Page() {
  return (
    <main className="mx-auto w-screen max-w-7xl px-6 py-8 ">
      <div className=" flex flex-col pb-10 gap-2">
        <h1 className="text-2xl font-extrabold">Novo produto</h1>
        <p>Cadastre um produto para venda no marketplace</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <aside className=" h-fit">{/* <Upload /> */}</aside>

        <section>
          <div className="flex gap-2 ">
            <ProductForm />
          </div>
        </section>
      </div>
    </main>
  );
}
