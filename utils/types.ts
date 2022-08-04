export interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  price: string;
  rating: number;
  alias: string;
  categories: { alias: string; title: string }[];
  review_count: number;
  location: { address1: string; display_address: string[] };
}
