export type NavbarLink = { id: string; href: string; label: string };

import { ProductWithCategory } from "@/app/admin/products/products.types";

export type Category = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  slug: string;
};

export type CategoryWithProducts = {
  created_at: string;
  id: number;
  image: string;
  name: string;
  products: ProductWithCategory[];
  slug: string;
};

import { Category } from "@/app/admin/categories/categories.types";

export type ProductWithCategory = {
  category: Category;
  created_at: string;
  heroImage: string;
  id: number;
  imagesUrl: string[];
  maxQuantity: number;
  price: number | null;
  slug: string;
  title: string;
};

export type UpdateProductSchema = {
  category: number;
  heroImage: string;
  imagesUrl: string[];
  maxQuantity: number;
  price: number;
  slug: string;
  title: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];

export type ProductsWithCategoriesResponse = ProductWithCategory[];
