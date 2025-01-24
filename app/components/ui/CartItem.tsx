import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CartItemType } from "@/types/cart";
import { motion, PanInfo } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { RefObject, useEffect, useState } from "react";

interface CartItemProps {
  item: CartItemType;
  isDraggingOver: boolean;
  onDrag: (info: PanInfo) => void;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  constraintsRef: RefObject<HTMLDivElement>;
}

export const CartItem = ({
  item,
  isDraggingOver,
  onDrag,
  onDragEnd,
  removeFromCart,
  updateQuantity,
  constraintsRef,
}: CartItemProps) => {
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    const checkDraggable = () => {
      setIsDraggable(window.innerWidth > 640);
    };

    // Check initially
    checkDraggable();

    // Add resize listener
    window.addEventListener("resize", checkDraggable);

    // Cleanup
    return () => window.removeEventListener("resize", checkDraggable);
  }, []);

  const preventDragStyles = "select-none touch-none";

  return (
    <motion.div
      drag={isDraggable}
      dragSnapToOrigin={isDraggable}
      dragConstraints={isDraggable ? constraintsRef : false}
      dragElastic={isDraggable ? 0.9 : 0}
      onDrag={isDraggable ? (_, info) => onDrag(info) : undefined}
      onDragEnd={
        isDraggable ? (event, info) => onDragEnd(event, info) : undefined
      }
      className={`${
        isDraggingOver ? "bg-red-100 dark:bg-red-900/50" : ""
      } ${preventDragStyles}`}
      whileHover={isDraggable ? { cursor: "grab" } : undefined}
      whileDrag={
        isDraggable
          ? {
              scale: 1.02,
              cursor: "grabbing",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              zIndex: 50,
            }
          : undefined
      }
      animate={{
        rotate: isDraggingOver ? [-1, 1, -1, 1, 0] : 0,
        transition: {
          rotate: {
            repeat: isDraggingOver ? Infinity : 0,
            duration: 0.2,
            ease: "linear",
          },
        },
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
    >
      <li
        className={`${
          isDraggingOver ? "bg-red-100 dark:bg-red-900/50" : "bg-white"
        } dark:bg-zinc-800 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)] transition-all duration-300 group`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <div className="relative h-48 sm:h-32 sm:w-32 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-700">
              {item.variant.imageUrl ? (
                <Image
                  fill
                  draggable={false}
                  src={item.variant.imageUrl}
                  alt={item.variant.name}
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="h-full w-full rounded-xl flex items-center justify-center">
                  <span className="text-zinc-600 text-sm">
                    {item.variant.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-0">
            <div className="flex justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {item.variant.productName}
                </h3>
                <div className="flex items-center gap-2 space-y-5">
                  <span className="px-2 py-1 text-sm bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md">
                    {item.variant.name}
                  </span>

                  {item.variant.stock < 10 && (
                    <span className="text-sm text-amber-600 dark:text-amber-400">
                      Only {item.variant.stock} left
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.variant._key)}
                className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 dark:hover:text-red-400 transition-all duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {item.options &&
                Object.entries(item.options).map(
                  ([optionName, optionData]) =>
                    optionData && (
                      <div
                        key={optionData._key}
                        className="inline-flex items-center rounded-full bg-violet-50 dark:bg-violet-950 px-3 py-1 mr-2"
                      >
                        <span className="text-sm text-zinc-600 dark:text-zinc-400 px-1">
                          {optionName}:
                        </span>
                        <span className="ml-1 text-sm font-medium text-violet-700 dark:text-violet-300">
                          {optionData.value}
                        </span>
                        {optionData.priceAdjustment > 0 && (
                          <span className="ml-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                            (+
                            {formatPrice(optionData.priceAdjustment)})
                          </span>
                        )}
                      </div>
                    )
                )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 pt-2">
              <div className="flex items-center space-x-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    updateQuantity(
                      item.variant._key,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  disabled={item.quantity <= 1}
                  className="h-8 w-8 hover:bg-white dark:hover:bg-zinc-600 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.variant._key, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.variant.stock}
                  className="h-8 w-8 hover:bg-white dark:hover:bg-zinc-600 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {formatPrice(item.unitPrice)}
              </p>
            </div>
          </div>
        </div>
      </li>
    </motion.div>
  );
};
