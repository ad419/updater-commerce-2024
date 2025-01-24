"use client";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishList";
import {
  HeartIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  stock: number;
  mainImage: string;
  slug: string;
  reviews: [];
}

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const [showClearModal, setShowClearModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render anything until after hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 h-[300px] rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear All
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              layout
            >
              {items.map((item, index) => (
                <WishlistItem
                  key={item._id}
                  item={item}
                  onRemove={removeItem}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-24"
            >
              <HeartIcon className="w-16 h-16 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Start adding items you love to your wishlist
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear All Modal */}
        <AnimatePresence>
          {showClearModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowClearModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm mx-4 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4">Clear Wishlist?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to remove all items from your wishlist?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      clearWishlist();
                      setShowClearModal(false);
                      toast.success("Wishlist cleared");
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Clear All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SwipeTutorial() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-sm w-full mx-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
          >
            {/* Mock Product Card */}
            <motion.div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-6 overflow-hidden">
              {/* Product Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13.5856 15.9395C14.4067 16.8953 15.8963 16.8629 16.675 15.873L19.25 12.5"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5.75 19.25H18.25C18.8023 19.25 19.25 18.8023 19.25 18.25V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H5.75C5.19772 4.75 4.75 5.19772 4.75 5.75V18.25C4.75 18.8023 5.19772 19.25 5.75 19.25Z"
                  />
                </svg>
              </div>

              {/* Animated Hand Gesture */}
              <motion.div
                animate={{
                  x: [-50, 50, -50],
                  scale: [1, 0.95, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-blue-500/50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <motion.path
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.95, 1, 0.95],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    d="M9.5 7c.31 0 .5.26.5.57v5.43c0 .28.22.5.5.5s.5-.22.5-.5V8c0-.31.19-.57.5-.57s.5.26.5.57v5.43c0 .28.22.5.5.5s.5-.22.5-.5V8.57c0-.31.19-.57.5-.57s.5.26.5.57v6.36c0 .28.22.5.5.5s.5-.22.5-.5V9.93c0-.31.19-.57.5-.57s.5.26.5.57v7.07c0 1.84-1.5 3.34-3.34 3.34H9.34C7.5 20.34 6 18.84 6 17V8.57C6 8.26 6.19 8 6.5 8s.5.26.5.57v4.93c0 .28.22.5.5.5s.5-.22.5-.5V7.57c0-.31.19-.57.5-.57z"
                  />
                </svg>
              </motion.div>

              {/* Direction Indicators */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4"
              >
                <motion.div
                  animate={{ x: [-5, 0, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500/20 to-red-500/40 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  animate={{ x: [5, 0, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-gradient-to-l from-red-500/20 to-red-500/40 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Tutorial Text */}
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold mb-2 dark:text-white"
              >
                Swipe to Remove
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 mb-6"
              >
                Swipe items left or right to remove them from your wishlist
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTutorial(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium"
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WishlistItem({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: (id: string) => void;
}) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-100, 0, 100], [0.8, 1, 0.8]);
  const background = useTransform(
    x,
    [-200, 0, 200],
    ["rgb(239 68 68)", "transparent", "rgb(239 68 68)"]
  );

  console.log("WishlistItem -> item", item);

  // Show instruction tooltip on first render
  const [showTip, setShowTip] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowTip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log(showTip);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      variant: {
        _key: item._id,
        name: item.name,
        price: item.price,
        sku: item._id,
        productName: item.name,
        stock: item.stock || 0,
        imageUrl: item.mainImage,
      },
      options: {},
      quantity: 1,
      unitPrice: item.price,
      totalPrice: item.price,
    };

    addToCart(cartItem);
    toast.success("Added to cart");
  };

  const avgRating = item?.reviews?.reduce(
    (acc, review) => acc + review.rating / item?.reviews?.length,
    0
  );

  const [showTutorial, setShowTutorial] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("swipeTutorialSeen");
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(false);
      localStorage.setItem("swipeTutorialSeen", "true");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>{showTutorial && <SwipeTutorial />}</AnimatePresence>

      {/* Background indicator */}
      <motion.div
        style={{ background }}
        className="absolute inset-0 rounded-xl -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{ x, opacity, scale }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, { offset }) => {
          if (Math.abs(offset.x) > 100) {
            onRemove(item._id);
            toast.success("Removed from wishlist");
          }
        }}
        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300"
      >
        {/* Discount Badge */}
        <div className="absolute -right-12 top-4 rotate-45 z-10">
          <div className="bg-red-500 text-white text-xs font-bold py-1 px-10 shadow-md">
            20% OFF
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square">
          <Image
            src={item.mainImage}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(item._id)}
              className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={`/product/${item.slug}`}>
            <h3 className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 hover:text-blue-500 transition-colors">
              {item.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-red-500">
              ${item.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${(item.price * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Ratings & Orders */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-yellow-400">{"★".repeat(avgRating)}</div>
            <span className="text-xs text-gray-500">
              ({item?.reviews?.length} reviews)
            </span>
          </div>

          {/* Shipping Info */}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:shadow-lg transition-shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
