import { getCollectionByName } from "@/sanity/lib/collections/getCollectionByName";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CollectionProducts from "./components/CollectionProducts";

interface Collection {
  _id: string;
  name: string;
  description?: string;
  image: string;
  products?: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    mainImage: string;
  }[];
}

interface PageProps {
  params: {
    collectionId: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const collection = await getCollectionByName(params.collectionId);

  return {
    title: collection?.name || "Collection Not Found",
    description: collection?.description || "",
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const collection = (await getCollectionByName(
    params.collectionId
  )) as Collection;

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Collection not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/collections" className="hover:text-gray-700">
            Collections
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-2" />
          <span className="text-gray-900 dark:text-white font-medium">
            {collection.name}
          </span>
        </nav>

        {/* Collection Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {collection.description}
              </p>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <span>{collection.products?.length || 0} Products</span>
            </div>
          </div>
        </div>

        {/* Filters and Grid */}
        <CollectionProducts products={collection.products} />
      </div>
    </div>
  );
}
