import { client } from "@/sanity/lib/client";
import { defineLive } from "next-sanity";
import "server-only";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("SANITY_API_READ_TOKEN is not set");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});
