import { fetchCategory } from "@/actions/fetch-category";
import CategoriesItemPage from "./_components/category-item";

export default async function AdminCategoriesPage() {
  const categories = await fetchCategory();

  return <CategoriesItemPage categories={categories} />;
}
