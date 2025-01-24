import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getCategories() {
  const CATEGORY_QUERY = defineQuery(`
    *[_type == "category"] {
    _id,
    name,
    "slug": slug.current,
    description
  } | order(name asc)
  `);

  try {
    const categories = await sanityFetch({ query: CATEGORY_QUERY });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
