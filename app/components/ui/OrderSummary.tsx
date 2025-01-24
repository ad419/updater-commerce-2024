import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  totalPrice: number;
  loading: boolean;
  onCheckout: () => void;
}

export const OrderSummary = ({
  totalPrice,
  loading,
  onCheckout,
}: OrderSummaryProps) => {
  return (
    <section className="mt-8 lg:mt-0 lg:col-span-5">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8 sticky top-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Order Summary
        </h2>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between pb-4">
            <p className="text-zinc-600 dark:text-zinc-400">Subtotal</p>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              {formatPrice(totalPrice)} $
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-dashed dark:border-zinc-700 pt-4">
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Total
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {formatPrice(totalPrice)} $
            </p>
          </div>
        </div>

        <Button
          className="mt-8 w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 text-white rounded-xl py-6 text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          disabled={loading}
          onClick={onCheckout}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "Proceed to Checkout"
          )}
        </Button>
      </div>
    </section>
  );
};
