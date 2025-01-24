"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  images?: { url: string; alt?: string }[];
  productName: string;
}

export function ProductGallery({
  mainImage,
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden"
        >
          <Image
            src={selectedImage}
            alt={productName}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {/* Main Image Thumbnail */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(mainImage)}
            className={`aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer
              transition-all duration-200 ease-in-out
              ${
                selectedImage === mainImage
                  ? "ring-2 ring-black dark:ring-white"
                  : "hover:opacity-75"
              }`}
          >
            <Image
              src={mainImage}
              alt={`${productName} main`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </motion.div>

          {/* Additional Images Thumbnails */}
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(image.url)}
              className={`aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  selectedImage === image.url
                    ? "ring-2 ring-black dark:ring-white"
                    : "hover:opacity-75"
                }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
