import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  title: string | null;
  content: string;
  createdAt: string;
}

export async function getReviewsByProduct(productId: string) {
  if (!productId) {
    return { success: false, error: "Product ID is required" };
  }

  const REVIEWS_QUERY = defineQuery(`
        *[_type == "review" && product._ref == $productId] | order(createdAt desc) {
        _id,
        userId,
        userName,
        rating,
        title,
        content,
        "images": images[]{
    "url": asset->url,
    alt
  },
        createdAt
        }
    `);

  try {
    const reviews = await sanityFetch({
      query: REVIEWS_QUERY,
      params: { productId },
    });
    return reviews.data as Review[];
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return { success: false, error: "Failed to fetch reviews" };
  }
}
