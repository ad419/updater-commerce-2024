import { backendClient } from "../backendClient";

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

export const addReview = async (review: ReviewData) => {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("Missing Sanity API token");
  }

  try {
    // Upload images first if they exist
    const imageAssets = review.images?.length
      ? await Promise.all(
          review.images.map(async (image) => {
            const asset = await backendClient.assets.upload("image", image, {
              filename: image.name,
            });
            return {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };
          })
        )
      : [];

    const document = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: review.product._ref,
      },
      userId: review.userId,
      userName: review.userName,
      rating: review.rating,
      title: review.title || null,
      content: review.content,
      images: imageAssets,
      createdAt: new Date().toISOString(),
    };

    const result = await backendClient.create(document, {
      token: process.env.SANITY_API_TOKEN,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Sanity error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create review",
    };
  }
};
