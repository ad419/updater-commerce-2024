import { getCategories } from "@/sanity/lib/categories/getCategories";
import { getFeaturedCollections } from "@/sanity/lib/collections/getCollections";
import FilterSection from "./components/FilterSection";

export default async function ShopPage() {
  // Fetch initial data
  const [categories, collections] = await Promise.all([
    getCategories(),
    getFeaturedCollections(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <FilterSection categories={categories} collections={collections} />
    </div>
  );
}
