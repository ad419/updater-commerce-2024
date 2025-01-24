"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductGrid from "../../shop/components/ProductGrid";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  mainImage: string;
  description: string;
  _createdAt: string;
}

interface LoadingGridProps {
  products: Product[];
}

const LoadingGrid = ({ products = [] }: LoadingGridProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <div>
      <motion.div layout className="min-h-[500px]">
        {isLoading ? (
          <ProductsGridSkeleton />
        ) : (
          <ProductGrid products={products} />
        )}
      </motion.div>
    </div>
  );
};

export default LoadingGrid;

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square rounded-lg bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}
