"use client";
import { Collection } from "@/types/collection";
import { motion } from "framer-motion";
import { CollectionCard } from "./CollectionCard";

interface CollectionsGridProps {
  collections: Collection[];
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <div className="w-full animate-gradient bg-gradient-to-br from-gray-50 via-purple-50 to-fuchsia-100 dark:from-zinc-900 dark:via-purple-900/40 dark:to-fuchsia-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Collections
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {collections.map((collection) => (
              <CollectionCard key={collection._id} collection={collection} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
