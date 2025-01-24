import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCollection = async (
  collectionId?: string,
  categoryId?: string
) => {
  const PRODUCT_QUERY = defineQuery(`*[_type == "product" ${
    collectionId && categoryId
      ? "&& references($collectionId) && references($categoryId)"
      : collectionId
      ? "&& references($collectionId)"
      : categoryId
      ? "&& references($categoryId)"
      : ""
  }] {
    _id,
    name,
    price,
    "mainImage": mainImage.asset->url,
    "category": category->name,
    "date": _createdAt,
    "collection": collection->name,
    "collectionId": collection->_id,
    stock,
    "slug": slug.current
  } | order(name asc)`);

  try {
    const products = await sanityFetch({
      query: PRODUCT_QUERY,
      params: {
        ...(collectionId && { collectionId }),
        ...(categoryId && { categoryId }),
      },
    });
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
