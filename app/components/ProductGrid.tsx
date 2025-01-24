"use client";
import { Slider } from "@/components/ui/slider";
import type { Category } from "@/types/category";
import { Product } from "@/types/product";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  query?: string;
}

export function ProductGrid({ products, query }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from products
  const uniqueCategories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category));
    return Array.from(categorySet);
  }, [products]);

  // Get min and max prices for the slider
  const priceStats = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // Initialize price range with actual min/max values
  const [priceRange, setPriceRange] = useState([
    priceStats.min,
    priceStats.max,
  ]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [products, selectedCategory, priceRange]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
        <motion.h2
          className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {query ? `Search Results for "${query}"` : "Featured Products"}
        </motion.h2>

        <div className="space-y-4">
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-4">
            <ProductFilters
              categories={uniqueCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="w-full sm:w-[200px] sm:absolute sm:right-0 sm:top-[-10px]">
              <p className="text-sm text-muted-foreground mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </p>
              <Slider
                defaultValue={[priceStats.min, priceStats.max]}
                max={priceStats.max}
                min={priceStats.min}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                  },
                }}
                exit={{ opacity: 0, y: 20 }}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-8"
          >
            No products found in this category.
          </motion.p>
        )}
      </div>
    </div>
  );
}
