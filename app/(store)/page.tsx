import { CollectionsGrid } from "@/app/components/CollectionsGrid";
import DynamicBanner from "@/app/components/MainBanner";
import { ProductGrid } from "@/app/components/ProductGrid";
import { getCategories } from "@/sanity/lib/categories/getCategories";
import { getFeaturedCollections } from "@/sanity/lib/collections/getCollections";
import { searchProductByName } from "@/sanity/lib/products/searchProductByName";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import Footer from "../components/ui/Footer";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.query?.toString() || "";

  const [products, categories, collections] = await Promise.all([
    searchProductByName(query) as Promise<Product[]>,
    getCategories() as Promise<Category[]>,
    getFeaturedCollections(),
  ]);

  return (
    <div className="space-y-8">
      <DynamicBanner placement="home_hero" />
      <ProductGrid products={products} categories={categories} query={query} />
      <CollectionsGrid collections={collections} />
      <Footer />
    </div>
  );
}
