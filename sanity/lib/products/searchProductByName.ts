import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductByName = async (productParam: string) => {
  const PRODUCT_QUERY =
    defineQuery(`*[_type == "product" && name match $productParam] {
    _id,
    name,
    price,
    "mainImage": mainImage.asset->url,
    "category": category->name,
    "date": _createdAt,
    "categoryId": category->_id,
    stock,
    "slug": slug.current,
    "reviews": *[_type == "review" && references(^._id)] {
      _id,
        userId,
        userName,
        rating,
        title,
        content,
      _createdAt
    },
    "averageRating": coalesce(
      round(
        math::avg(
          *[_type == "review" && references(^._id)].rating
        ) * 10
      ) / 10,
      0
    ),
    "totalReviews": count(*[_type == "review" && references(^._id)])
  } | order(name asc)`);
  try {
    const products = await sanityFetch({
      query: PRODUCT_QUERY,
      params: {
        productParam: `${productParam}*`,
      },
    });
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
