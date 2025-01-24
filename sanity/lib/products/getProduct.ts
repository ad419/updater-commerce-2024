// build the getproduct from slug

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByName = async (productParam: string) => {
  const GET_PRODUCT =
    defineQuery(`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  sku,
  "mainImage": mainImage.asset->url,
  "images": images[]{
    "url": asset->url,
    alt
  },
  price,
  compareAtPrice,
  description,
  shortDescription,
  "category": category->name,
  "collections": collections[]->name,
  variants,
  options,
  stock,
  specifications,
  tags,
  seo,
  status,
  featured,
  publishedAt
}`);

  try {
    const product = await sanityFetch({
      query: GET_PRODUCT,
      params: { slug: productParam },
    });
    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
