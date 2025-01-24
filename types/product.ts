export interface Product {
  _id: string;
  name: string;
  price: number;
  mainImage: string;
  category: string;
  description: string;
  compareAtPrice?: number;
  shortDescription?: string;
  stock: number;
  rating?: number;
  date: string;
  comparePrice?: number;
  slug: string;
  reviews: [];
}
