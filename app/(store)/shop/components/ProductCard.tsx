"use client";

import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ translateY: -8 }}
      className="group relative h-[430px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800 p-3"
    >
      {/* Main Card Content */}
      <div className="relative h-full rounded-[1.7rem] bg-gray-50 dark:bg-gray-900 p-5 cursor-pointer">
        <Link href={`/product/${product.slug}`}>
          {/* Floating Price Tag */}
          <div className="absolute -right-2 top-4 z-10">
            <div className="flex items-center gap-2">
              {product.compareAtPrice && (
                <span className="rounded-l-full bg-rose-100 dark:bg-rose-900 px-3 py-1.5 text-sm font-bold text-rose-600 dark:text-rose-300">
                  Save{" "}
                  {Math.round(
                    ((product.compareAtPrice - product.price) /
                      product.compareAtPrice) *
                      100
                  )}
                  %
                </span>
              )}
              <div className="flex flex-col items-end rounded-full bg-black dark:bg-gray-700 px-4 py-1.5 text-white shadow-lg">
                <span className="text-sm font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src={product.mainImage}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />

            {/* Stock Indicator */}
            <div className="absolute bottom-3 left-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  product.stock > 0
                    ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-lg bg-blue-50 dark:bg-blue-900/50 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">
                {product.category}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-sm font-medium dark:text-gray-200">
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
              {product.name}
            </h3>
            <br />

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>
          </div>
        </Link>

        {/* Action Button */}
        <div className="absolute bottom-5 left-5 right-5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className={`group relative w-full overflow-hidden rounded-xl p-3 text-sm font-bold transition-all ${
              product.stock === 0
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                : "bg-black dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600"
            }`}
            disabled={product.stock === 0}
          >
            <span className="relative z-10">Add to Cart</span>
            <div className="absolute inset-0 -translate-x-full bg-blue-600 dark:bg-blue-500 transition-transform group-hover:translate-x-0" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
