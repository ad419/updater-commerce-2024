import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_COLLECTION_BY_NAME = defineQuery(`
  *[_type == "collection" && slug.current == $collectionSlug] {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "slug": slug.current,
      price,
      "mainImage": mainImage.asset->url,
    }
  }
`);

export async function getCollectionByName(slug: string) {
  if (!slug) {
    throw new Error("Collection slug is required");
  }

  try {
    const collection = await sanityFetch({
      query: GET_COLLECTION_BY_NAME,
      params: { collectionSlug: slug },
    });
    return collection.data[0] || null;
  } catch (error) {
    console.error("Failed to fetch collection:", error);
    return null;
  }
}
