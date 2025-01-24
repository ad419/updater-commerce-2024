import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  variant: {
    _key: string;
    name: string;
    price: number;
    sku: string;
    productName: string;
    stock: number;
    imageUrl?: string;
  };
  options: Record<
    string,
    { value: string; priceAdjustment: number; _key: string } | null
  >;
  quantity: number;

  unitPrice: number;
  totalPrice: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (newItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.variant._key === newItem.variant._key
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += newItem.quantity;
            newItems[existingItemIndex].totalPrice += newItem.totalPrice;
            return { items: newItems };
          }

          return { items: [...state.items, newItem] };
        }),
      updateQuantity: (variantKey, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.variant._key === variantKey) {
              const newTotalPrice = item.unitPrice * quantity;
              return {
                ...item,
                quantity,
                totalPrice: newTotalPrice,
              };
            }
            return item;
          });
          return { items: newItems };
        }),
      removeFromCart: (variantKey) =>
        set((state) => ({
          items: state.items.filter((item) => item.variant._key !== variantKey),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
