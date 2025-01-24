"use client";

import ProductCard from "@/app/(store)/shop/components/ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  mainImage: string;
  _createdAt?: string;
}

interface CollectionProductsProps {
  products: Product[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export default function CollectionProducts({
  products,
}: CollectionProductsProps) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortKey, setSortKey] = useState("featured");

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortKey(value);
    const sorted = [...products];
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b._createdAt || "").getTime() -
            new Date(a._createdAt || "").getTime()
        );
        break;
      default:
        // Reset to original order
        sorted.sort((a, b) => products.indexOf(a) - products.indexOf(b));
    }
    setSortedProducts(sorted);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <select
          value={sortKey}
          onChange={handleSort}
          className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <AnimatePresence mode="wait">
        {sortedProducts.length > 0 ? (
          <motion.div
            key={sortKey}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                variants={item}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <p className="text-gray-600 dark:text-gray-400">
              No products found in this collection
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
