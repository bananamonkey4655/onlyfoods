export interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  price: string;
  phone: string;
  rating: number;
  alias: string;
  transcations: string[];
  categories: Array<{ alias: string; title: string }>;
  review_count: number;
  location: { address1: string; display_address: string[] };
  display_phone?: string;
  photos?: string[];
  hours?: Array<{ is_open_now: boolean }>;
}
