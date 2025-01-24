import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12; // Products per page
  const collectionId = searchParams.get("collectionId");
  const categoryId = searchParams.get("categoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  try {
    // Build filters
    const filters = [];
    if (collectionId) filters.push(`references("${collectionId}")`);
    if (categoryId) filters.push(`references("${categoryId}")`);
    if (minPrice) filters.push(`price >= ${parseFloat(minPrice)}`);
    if (maxPrice) filters.push(`price <= ${parseFloat(maxPrice)}`);

    const start = (page - 1) * limit;
    const end = start + limit;

    // Build the GROQ query
    const query = defineQuery(`*[_type == "product"${
      filters.length > 0 ? ` && ${filters.join(" && ")}` : ""
    }] | order(_createdAt desc) [${start}...${end}] {
      _id,
      name,
      price,
      compareAtPrice,
      "mainImage": mainImage.asset->url,
      "category": category->name,
      "collection": collection->name,
      stock,
      "slug": slug.current
    }`);

    const countQuery = defineQuery(
      `count(*[_type == "product"${
        filters.length > 0 ? ` && ${filters.join(" && ")}` : ""
      }])`
    );

    const [productsResponse, totalCountResponse] = await Promise.all([
      sanityFetch({ query }),
      sanityFetch({ query: countQuery }),
    ]);

    console.log("Query:", query);
    console.log("Products Response:", productsResponse);

    return NextResponse.json({
      products: productsResponse?.data || [],
      pagination: {
        total: totalCountResponse?.data || 0,
        pages: Math.ceil((totalCountResponse?.data || 0) / limit),
        current: page,
      },
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
