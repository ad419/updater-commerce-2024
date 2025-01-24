import { groq } from "next-sanity";
import { client } from "../client";

export async function searchProducts(query: string) {
  return client.fetch(
    groq`*[_type == "product" && (
      name match $query + "*" || 
      shortDescription match $query + "*" ||
      description match $query + "*"
    )] {
      _id,
      name,
      "slug": slug.current,
      price,
      stock,
      "date": _createdAt,
      "mainImage": mainImage.asset->url,
      shortDescription
    }`,
    { query } as any
  );
}
