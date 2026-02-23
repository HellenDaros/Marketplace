import { Category } from "@/app/(store)/(produ)/products/productSchema";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: string;
  image: string;
  description: string;
  categories: Category;
}
