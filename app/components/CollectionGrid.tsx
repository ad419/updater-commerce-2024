import type { Collection } from "@/types/collection";
import { CollectionCard } from "./CollectionCard";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
