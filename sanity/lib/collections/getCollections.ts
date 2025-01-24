// get featured collections
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const COLLECTION_QUERY = defineQuery(`
  *[_type == "collection" && featured == true] {
    _id,
    name,
    slug,
    description,
    "image": image.asset->url,
    
  }
`);

export async function getFeaturedCollections() {
  try {
    const collections = await sanityFetch({
      query: COLLECTION_QUERY,
    });
    return collections.data || [];
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return [];
  }
}
