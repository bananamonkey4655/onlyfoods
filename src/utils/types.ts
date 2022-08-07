export interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  url: string;
  price: string;
  phone: string;
  rating: number;
  alias: string;
  transcations: string[];
  categories: Category[];
  review_count: number;
  location: Location;
  display_phone?: string;
  photos?: string[];
  hours?: Array<{ is_open_now: boolean }>;
}

interface Location {
  address1: string;
  display_address: string[];
}

interface Category {
  alias: string;
  title: string;
}
