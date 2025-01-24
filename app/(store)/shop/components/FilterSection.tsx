"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";

interface FilterSectionProps {
  categories: Category[];
  collections: Collection[];
}

export default function FilterSection({
  categories,
  collections,
}: FilterSectionProps) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    pages: 1,
  });
  const [filters, setFilters] = useState({
    categoryId: "",
    collectionId: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

  const fetchProducts = useCallback(async (currentFilters: typeof filters) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) queryParams.set(key, value.toString());
      });

      const response = await fetch(`/api/shop?${queryParams}`);
      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced version for price filters
  const debouncedFetch = useCallback(
    (currentFilters: typeof filters) => {
      debounce(() => fetchProducts(currentFilters), 500)();
    },
    [fetchProducts]
  );

  useEffect(() => {
    if (filters.minPrice || filters.maxPrice) {
      debouncedFetch(filters);
    } else {
      fetchProducts(filters);
    }
  }, [filters, fetchProducts, debouncedFetch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      page: 1, // Reset to first page when filters change
      [name]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      [name]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Main container with filters and products side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        {/* Filters Panel */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5" />
                <span className="font-medium">Filters</span>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "categoryId")
                  }
                  value={filters.categoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Collection Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Collection</label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "collectionId")
                  }
                  value={filters.collectionId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Collections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Collections</SelectItem>
                    {collections.map((collection) => (
                      <SelectItem key={collection._id} value={collection._id}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange(e)}
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange(e)}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          {/* Active Filters */}
          <motion.div layout className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || key === "page") return null;
              return (
                <motion.div
                  key={key}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleSelectChange("", key)}
                  >
                    {key.replace("Id", "")}: {value}
                    <span className="ml-1">×</span>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Products Grid */}
          <motion.div layout className="min-h-[400px]">
            {isLoading ? (
              <ProductsGridSkeleton />
            ) : (
              <ProductGrid products={products} />
            )}
          </motion.div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Pagination
                currentPage={pagination.current}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

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
