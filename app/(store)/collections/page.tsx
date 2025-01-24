import MainBanner from "@/app/components/MainBanner";
import { getFeaturedCollections } from "@/sanity/lib/collections/getCollections";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: {
    current: string;
  };
}

export default async function CollectionsPage() {
  const collections = await getFeaturedCollections();

  return (
    <div className="space-y-12">
      <MainBanner placement="collection_page" />

      <div className="container mx-auto px-4 p-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections?.map((collection: Collection) => (
            <Link
              key={collection._id}
              href={`/collections/${collection.slug.current}`}
              className="group relative block"
            >
              <div className="relative h-[450px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 transition-all duration-500 group-hover:via-black/40 group-hover:to-black/90" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Glass Effect Card */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-white/90 uppercase bg-white/20 rounded-full">
                        Collection
                      </span>

                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        {collection.name}
                      </h3>

                      {collection.description && (
                        <p className="text-white/80 text-sm line-clamp-2 font-light">
                          {collection.description}
                        </p>
                      )}

                      <div className="mt-4 flex items-center">
                        <span className="text-white/90 text-sm font-medium">
                          Explore Collection
                        </span>
                        <svg
                          className="w-5 h-5 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
