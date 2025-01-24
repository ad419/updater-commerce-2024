"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { motion, PanInfo } from "framer-motion";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { CartItem } from "../../components/ui/CartItem";
import { OrderSummary } from "../../components/ui/OrderSummary";
import { WelcomeMessage } from "../../components/ui/WelcomeMessage";

const CartPage = () => {
  const { user } = useUser();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState<string | null>(null);

  const constraintsRef = useRef(null);
  const trashRef = useRef(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    itemId: string
  ) => {
    const trashElement = trashRef.current as HTMLDivElement | null;
    if (!trashElement) return;

    const trashRect = trashElement.getBoundingClientRect();
    const cardPosition = { x: info.point.x, y: info.point.y };

    const isOverTrash =
      cardPosition.x >= trashRect.left - 100 &&
      cardPosition.x <= trashRect.right + 100 &&
      cardPosition.y >= trashRect.top - 100 &&
      cardPosition.y <= trashRect.bottom + 100;

    if (isOverTrash) {
      removeFromCart(itemId);
    }
    setIsDraggingOver(null);
  };

  const handleDrag = (info: PanInfo, itemId: string) => {
    const trashElement = trashRef.current as HTMLDivElement | null;
    if (!trashElement) return;

    const trashRect = trashElement.getBoundingClientRect();
    const cardPosition = {
      x: info.point.x + window.scrollX,
      y: info.point.y + window.scrollY,
    };

    const isOverTrash =
      cardPosition.x >= trashRect.left - 100 &&
      cardPosition.x <= trashRect.right + 100 &&
      cardPosition.y >= trashRect.top - 100 &&
      cardPosition.y <= trashRect.bottom + 100;

    setIsDraggingOver(isOverTrash ? itemId : null);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        {user && (
          <WelcomeMessage name={user.firstName || user.username || "there"} />
        )}
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Add some items to your cart to see them here.
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:py-16 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-900/50 min-h-screen">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        {user && (
          <WelcomeMessage name={user.firstName || user.username || "there"} />
        )}
        <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Shopping Cart
        </h1>

        <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <motion.div ref={constraintsRef} className="w-full h-full relative">
              <div
                ref={trashRef}
                className="fixed bottom-6 right-6 p-6 rounded-full bg-red-500/10 border-2 border-red-500/20 z-[100] hover:bg-red-500/20 transition-all duration-200 hidden sm:block"
              >
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>

              <ul className="space-y-6">
                {items.map((item) => (
                  <CartItem
                    key={item.variant._key}
                    item={{
                      ...item,
                      options: Object.fromEntries(
                        Object.entries(item.options).filter(
                          (
                            entry
                          ): entry is [
                            string,
                            {
                              _key: string;
                              value: string;
                              priceAdjustment: number;
                            }
                          ] => entry[1] !== null
                        )
                      ),
                    }}
                    isDraggingOver={isDraggingOver === item.variant._key}
                    onDrag={(info) => handleDrag(info, item.variant._key)}
                    onDragEnd={(event, info) =>
                      handleDragEnd(event, info, item.variant._key)
                    }
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    constraintsRef={constraintsRef}
                  />
                ))}
              </ul>
            </motion.div>
          </div>

          <OrderSummary
            totalPrice={items.reduce(
              (total, item) => total + item.totalPrice,
              0
            )}
            loading={loading}
            onCheckout={() => {
              setLoading(true);
              // Add checkout logic here
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
