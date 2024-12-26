import { fetchCategory } from "@/actions/fetch-category";
import CategoriesItemPage from "./_components/category-item";

export default async function AdminCategoriesPage() {
  const categories = await fetchCategory();
  console.log(categories);

  return <CategoriesItemPage categories={categories} />;
}
