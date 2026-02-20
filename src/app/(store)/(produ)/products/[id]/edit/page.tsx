import { ProductForm } from "../../../../../../components/product-form";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductForm productId={params.id} />;
}
