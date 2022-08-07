import { Restaurant } from "./types";

import create from "zustand";

interface RestaurantState {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  sortedRestaurants: Restaurant[];
  sortByHighestRating: () => void;
  sortByLowestRating: () => void;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: [],
  sortedRestaurants: [],

  setRestaurants: (res: Restaurant[]) =>
    set({ restaurants: res, sortedRestaurants: res }),
  sortByHighestRating: () =>
    set((state) => ({
      sortedRestaurants: [...state.sortedRestaurants].sort(
        (r1, r2) => r2.rating - r1.rating
      ),
    })),
  sortByLowestRating: () =>
    set((state) => ({
      sortedRestaurants: [...state.sortedRestaurants].sort(
        (r1, r2) => r1.rating - r2.rating
      ),
    })),
}));
