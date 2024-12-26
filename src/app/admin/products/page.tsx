import { fetchCategory } from "@/actions/fetch-category";
import { getProductsWithCategories } from "@/actions/fetch-product";
import ProductsItemPage from "@/app/admin/products/_components/product-item";

export default async function ProductsPage() {
  const categories = await fetchCategory();
  const productsWithCategories = await getProductsWithCategories();

  return (
    <ProductsItemPage
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
}
