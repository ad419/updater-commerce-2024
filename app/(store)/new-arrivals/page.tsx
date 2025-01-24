import MainBanner from "@/app/components/MainBanner";
import { getLatestProducts } from "@/sanity/lib/products/getLatestProducts";
import LoadingGrid from "./components/LoadingGrid";

interface Product {
  _id: string;
  name: string;
  slug: string;
  stock: number;
  date: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  mainImage: string;
  description: string;
  _createdAt: string;
}

const page = async () => {
  const products = (await getLatestProducts()) || ([] as Product[]);

  console.log(products);

  return (
    <div className="">
      <div className="pt-6">
        <MainBanner placement="arrivals_page" />
      </div>
      <div className="container mx-auto px-4 p-9">
        <h1 className="text-3xl font-bold mb-4">New Arrivals</h1>

        <p className="text-lg text-gray-600 mb-6">
          Explore our latest products that have just arrived in store.
        </p>
      </div>

      <div className="container mx-auto">
        <LoadingGrid products={products} />
      </div>
    </div>
  );
};

export default page;
