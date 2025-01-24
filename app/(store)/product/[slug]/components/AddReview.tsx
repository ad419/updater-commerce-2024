"use client";

import { useUser } from "@clerk/clerk-react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface ReviewData {
  product: {
    _ref: string;
    _type: "reference";
  };
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  content: string;
  images?: File[];
}

interface ReviewImage {
  url: string;
  alt?: string;
}

interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  content: string;
  images?: ReviewImage[] | null;
}

export default function AddReviewClient({
  productId,
  submitReview,
  reviews,
}: {
  productId: string;
  submitReview: (reviewData: ReviewData) => Promise<{
    success: boolean;
    data?: ReviewData;
    error?: string;
  }>;
  reviews: Review[];
}) {
  const { user } = useUser();
  const hasReviewed = reviews.some((review) => review.userId === user?.id);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    content: "",
    images: [] as File[],
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  if (hasReviewed) {
    return (
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-gray-600">
          You have already reviewed this product. Thank you for your feedback!
        </p>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValid =
        file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024;
      if (!isValid) {
        toast.error(`${file.name} is invalid. Images must be under 5MB`);
      }
      return isValid;
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to submit a review");
      return;
    }

    if (!formData.rating || !formData.content) {
      toast.error("Please provide a rating and review content");
      return;
    }

    const reviewData: ReviewData = {
      product: {
        _ref: productId,
        _type: "reference" as const,
      },
      userId: user.id,
      userName: user.fullName || "Anonymous",
      ...formData,
    };

    startTransition(async () => {
      try {
        const result = await submitReview(reviewData);

        if (result.success) {
          setFormData({ rating: 0, title: "", content: "", images: [] });
          toast.success("Review submitted successfully!");
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit review"
        );
      }
    });
  };

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={`text-4xl ${
                  star <= (hoveredRating || formData.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            placeholder="Give your review a title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Review Content
          </label>
          <textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="Write your review here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Add Images (Max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
            disabled={formData.images.length >= 5}
          />
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || !formData.rating || !formData.content || !user}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
