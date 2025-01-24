import type { Collection } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const bgColors = [
  "bg-rose-50",
  "bg-blue-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-violet-50",
  "bg-cyan-50",
];

export function CollectionCard({
  collection,
  index = 0,
}: {
  collection: Collection;
  index?: number;
}) {
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Link
      href={`/collections/${collection.slug.current}`}
      className={`group relative flex w-full h-72 overflow-hidden rounded-xl ${bgColor} transition-all hover:shadow-lg`}
    >
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600">
            {collection.name}
          </h3>
          {collection.description && (
            <p className="mt-3 text-base text-gray-600 line-clamp-3">
              {collection.description}
            </p>
          )}
        </div>
        <span className="inline-flex items-center text-base font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
          Shop Now <span className="ml-1">→</span>
        </span>
      </div>

      <div className="relative w-1/2 h-full">
        {collection.image && (
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
    </Link>
  );
}
