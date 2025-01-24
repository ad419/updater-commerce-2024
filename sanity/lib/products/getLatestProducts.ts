import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getLatestProducts = async () => {
  const getLatestProducts = defineQuery(`
    *[_type == "product"] | order(_createdAt desc) [0...8] {
      _id,
      name,
      "slug": slug.current,
      price,
      stock,
      compareAtPrice,
      "mainImage": mainImage.asset->url,
      "description": pt::text(description),
      _createdAt
    }
  `);

  try {
    const products = await sanityFetch({
      query: getLatestProducts,
    });
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
