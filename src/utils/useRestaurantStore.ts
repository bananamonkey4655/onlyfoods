import { Restaurant } from "@/utils/types";

import create from "zustand";

interface RestaurantState {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  sortedRestaurants: Restaurant[];
  sortByHighestRating: () => void;
  sortByLowestRating: () => void;
  sortByExpensive: () => void;
  sortByAffordable: () => void;
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
  sortByAffordable: () =>
    set((state) => ({
      sortedRestaurants: [...state.sortedRestaurants].sort((r1, r2) => {
        if (!r1.price) {
          return 1;
        }
        if (!r2.price) {
          return -1;
        }
        return r1.price.length - r2.price.length;
      }),
    })),
  sortByExpensive: () =>
    set((state) => ({
      sortedRestaurants: [...state.sortedRestaurants].sort((r1, r2) => {
        if (!r1.price) {
          return 1;
        }
        if (!r2.price) {
          return -1;
        }
        return r2.price.length - r1.price.length;
      }),
    })),
}));
