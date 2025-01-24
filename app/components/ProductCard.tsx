import { useWishlist } from "@/hooks/useWishList";
import { Product } from "@/types/product";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log(product);

  useEffect(() => {
    setMounted(true);
    setIsWishlisted(isInWishlist(product._id));
  }, [product._id, isInWishlist]);

  if (!mounted) return null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeItem(product._id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      addItem(product);
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }
  };

  // the product doesnt have property in stock so if product
  const inStock = product.stock > 0 ? true : false;
  // track the is new property by date product was created
  const isNew =
    new Date(product.date).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      <div className="aspect-square w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Out of Stock Badge */}
        {inStock === false && (
          <div className="absolute top-2 left-2 backdrop-blur-md bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
            Out of Stock
          </div>
        )}

        {/* Sale Badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-2 right-2 backdrop-blur-md bg-white/80 dark:bg-black/50 text-gray-900 dark:text-white px-2 py-1 rounded-md text-xs font-medium">
            -
            {Math.round(
              ((product.compareAtPrice - product.price) /
                product.compareAtPrice) *
                100
            )}
            %
          </div>
        )}

        {/* New Product Badge */}
        {isNew && (
          <div className="absolute top-2 left-2 backdrop-blur-md bg-blue-500/80 text-white px-2 py-1 rounded-md text-xs font-medium">
            New
          </div>
        )}

        {/* Wishlist Button */}

        {/* Main Image */}
        {product.mainImage ? (
          <Image
            width={400}
            height={400}
            src={product.mainImage}
            alt={product.name}
            className="h-full w-full transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
            priority={true}
            quality={90}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <svg
              className="w-8 h-8 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {inStock && (
            <button
              className="bg-white dark:bg-gray-900 p-2 rounded-lg hover:scale-110 active:scale-95 transition-transform"
              aria-label="Add to cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
          <motion.button
            onClick={handleWishlistClick}
            whileTap={{ scale: 0.9 }}
            className="z-10 p-2 rounded-lg bg-white dark:bg-black/50 backdrop-blur-md"
          >
            {isWishlisted ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="p-3">
        {/* Product Category */}
        {product.category && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {product.category}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            ${product.price}
          </p>
          {product.compareAtPrice && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
              ${product.compareAtPrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
