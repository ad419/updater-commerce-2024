"use server";

import { addReview } from "@/sanity/lib/reviews/addReview";

interface ReviewResponse {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface ReviewData {
  product: {
    _ref: string;
    _type: "reference";
  };
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  content: string;
}

export async function submitReview(reviewData: ReviewData) {
  if (
    !reviewData.product._ref ||
    !reviewData.userId ||
    !reviewData.content ||
    !reviewData.rating
  ) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const enrichedData = {
      _type: "review" as const,
      ...reviewData,
      createdAt: new Date().toISOString(),
    };

    const result = await addReview(enrichedData);

    if (!result.success) {
      throw new Error(result.error);
    }

    return {
      success: true,
      data: result.data as ReviewResponse,
    };
  } catch (error) {
    console.error("Review submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit review",
    };
  }
}
