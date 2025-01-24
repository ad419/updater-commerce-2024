import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMainBanner = async (placement: string) => {
  const BANNER_QUERY = defineQuery(`
    *[_type == "banner" && placement == $placement && isActive == true] | order(priority desc)[0] {
      _id,
      headline,
      subheadline,
      buttonText,
      buttonLink,
      placement,
      isActive,
      priority,
      "image": image.asset->url
    }
  `);

  try {
    const banner = await sanityFetch({
      query: BANNER_QUERY,
      params: { placement },
    });
    return banner.data || null;
  } catch (error) {
    console.error("Failed to fetch main banner:", error);
    return null;
  }
};
