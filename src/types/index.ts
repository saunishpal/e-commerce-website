export type Category = {
  id: number;
  name: string;
  image: string;
  itemCount: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  inStock: boolean;
};