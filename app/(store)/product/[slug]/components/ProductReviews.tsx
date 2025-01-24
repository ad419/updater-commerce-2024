import { getReviewsByProduct } from "@/sanity/lib/reviews/getReviewsByProduct";
import { submitReview } from "../../../../../lib/addReviewServer";
import AddReview from "./AddReview";
import ReviewImages from "./ReviewImages";

interface ProductReviewsProps {
  productId: string;
}

interface ReviewImage {
  url: string;
  alt?: string;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  title?: string;
  content: string;
  images?: ReviewImage[] | null;
}

const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  // now we get the reviews from Sanity

  const reviews = (await getReviewsByProduct(productId)) as Review[];

  console.log(reviews);

  return (
    <div className="">
      <h4 className="text-lg font-semibold">Customer Reviews</h4>
      <div className="space-y-2 mt-4 w-full">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{review.userName}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{review.title}</p>
              <p className="text-gray-800">{review.content}</p>
              {review.images && <ReviewImages images={review.images} />}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
      <AddReview
        submitReview={submitReview}
        productId={productId}
        reviews={reviews}
      />
    </div>
  );
};

export default ProductReviews;
