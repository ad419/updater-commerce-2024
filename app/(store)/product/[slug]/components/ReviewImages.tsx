"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface ReviewImage {
  url: string;
  alt?: string;
}

interface ReviewImagesProps {
  images: ReviewImage[];
}

export default function ReviewImages({ images }: ReviewImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images?.length) return null;

  return (
    <>
      <div className="mt-4 flex gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-20 w-20 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.alt || "Review Image"}
              fill
              className="rounded-md object-cover hover:opacity-90 transition-opacity"
              sizes="(max-width: 80px) 100vw, 80px"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt || "Review Image"}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex((prev) => prev! - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronLeftIcon className="w-8 h-8" />
              </button>
            )}
            {selectedIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedIndex((prev) => prev! + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
