import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categoryId: string) => {
  const PRODUCT_QUERY =
    defineQuery(`*[_type == "product" && category._ref == $categoryId] {
      _id,
      name,
      price,
      "mainImage": mainImage.asset->url,
      "category": category->name,
      "date": _createdAt,
      "categoryId": category->_id,
      stock,
      "slug": slug.current
    } | order(name asc)`);

  try {
    const products = await sanityFetch({
      query: PRODUCT_QUERY,
      params: {
        categoryId: categoryId,
      },
    });
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
