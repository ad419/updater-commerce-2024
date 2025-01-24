import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  stock: number;
  mainImage: string;
  slug: string;
  reviews: [];
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i._id === item._id);

        if (!exists) {
          set((state) => ({
            items: [...state.items, item],
          }));
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== itemId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (itemId) => {
        const { items } = get();
        return items.some((item) => item._id === itemId);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
