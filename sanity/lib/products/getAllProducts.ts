import { sanityFetch } from "../live";

interface FilterParams {
  category?: string;
  collection?: string;
  sort?: string;
}

export const getAllProducts = async (filters: FilterParams = {}) => {
  const { category, collection, sort } = filters;

  let query = `*[_type == "product"`;

  // Add filter conditions
  if (category) {
    query += ` && references(*[_type == "category" && slug.current == "${category}"]._id)`;
  }
  if (collection) {
    query += ` && references(*[_type == "collection" && slug.current == "${collection}"]._id)`;
  }

  query += `]`;

  // Add sorting
  if (sort) {
    switch (sort) {
      case "price-asc":
        query += "| order(price asc)";
        break;
      case "price-desc":
        query += "| order(price desc)";
        break;
      // Add other sort options as needed
    }
  }

  try {
    const products = await sanityFetch({ query: query });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
