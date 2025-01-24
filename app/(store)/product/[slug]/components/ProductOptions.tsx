"use client";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { toast } from "sonner";

interface OptionValue {
  _key: string;
  value: string;
  priceAdjustment: number;
}

interface Option {
  _key: string;
  name: string;
  values?: OptionValue[];
}

interface Variant {
  _key: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
}

interface ProductOptionsProps {
  options: Option[];
  variants: Variant[];
  basePrice: number;
  images: { url: string }[];
  productName: string;
}

export function ProductOptions({
  options,
  variants,
  basePrice,
  images,
  productName,
}: ProductOptionsProps) {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, OptionValue | null>
  >({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Calculate total price adjustments from selected options
  const optionsPriceAdjustment = Object.values(selectedOptions).reduce(
    (total, option) => total + (option?.priceAdjustment || 0),
    0
  );

  // Calculate final price including base price, variant price, and options adjustments
  const currentPrice =
    (selectedVariant?.price || basePrice) + optionsPriceAdjustment;

  const handleOptionChange = (optionName: string, value: string) => {
    const option = options.find((opt) => opt.name === optionName);
    const selectedValue = option?.values?.find((v) => v.value === value);

    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: selectedValue || null,
    }));
  };

  const handleVariantChange = (variantKey: string) => {
    const variant = variants.find((v) => v._key === variantKey);
    setSelectedVariant(variant || null);
  };

  // Check if we can add to cart
  const canAddToCart =
    selectedVariant && Object.keys(selectedOptions).length === options.length;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    try {
      addToCart({
        variant: {
          ...selectedVariant!,
          productName,
          imageUrl: images?.[0]?.url || "/placeholder.jpg",
        },
        options: selectedOptions,
        quantity,
        unitPrice: currentPrice,
        totalPrice: currentPrice * quantity,
      });

      toast.success("Added to cart");
    } catch (error: unknown) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      {variants.length > 0 && (
        <div className="border rounded-lg p-3 sm:p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Model
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedVariant?._key || ""}
            onChange={(e) => handleVariantChange(e.target.value)}
          >
            <option value="">Choose a model</option>
            {variants.map((variant) => (
              <option key={variant._key} value={variant._key}>
                {variant.name} - ${variant.price.toFixed(2)}
                {variant.price > basePrice &&
                  ` (+$${(variant.price - basePrice).toFixed(2)})`}
              </option>
            ))}
          </select>
          {selectedVariant && (
            <div className="mt-2 text-sm">
              <p className="text-gray-600">SKU: {selectedVariant.sku}</p>
              <p
                className={`${
                  selectedVariant.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedVariant.stock > 0
                  ? `${selectedVariant.stock} units in stock`
                  : "Out of stock"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Options Selection */}
      <div className="space-y-3 sm:space-y-4">
        {options.map((option) => (
          <div key={option._key} className="border rounded-lg p-3 sm:p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.name}
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedOptions[option.name]?.value || ""}
              onChange={(e) => handleOptionChange(option.name, e.target.value)}
            >
              <option value="">Select {option.name}</option>
              {option.values?.map((optionValue) => (
                <option key={optionValue.value} value={optionValue.value}>
                  {optionValue.value}
                  {optionValue.priceAdjustment > 0 &&
                    ` (+$${optionValue.priceAdjustment.toFixed(2)})`}
                  {optionValue.priceAdjustment < 0 &&
                    ` (-$${Math.abs(optionValue.priceAdjustment).toFixed(2)})`}
                </option>
              ))}
            </select>
            {selectedOptions[option.name] && (
              <p className="mt-1 text-sm text-gray-500">
                Price adjustment:{" "}
                {selectedOptions[option.name]!.priceAdjustment > 0 ? "+" : ""}$
                {selectedOptions[option.name]!.priceAdjustment.toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-medium">${basePrice.toFixed(2)}</span>
        </div>

        {selectedVariant && selectedVariant.price !== basePrice && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Model Upgrade:</span>
            <span
              className={
                selectedVariant.price > basePrice
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {selectedVariant.price > basePrice ? "+" : ""}$
              {(selectedVariant.price - basePrice).toFixed(2)}
            </span>
          </div>
        )}

        {Object.entries(selectedOptions).map(
          ([name, option]) =>
            option &&
            option.priceAdjustment !== 0 && (
              <div
                key={name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">{name}:</span>
                <span
                  className={
                    option.priceAdjustment > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {option.priceAdjustment > 0 ? "+" : ""}$
                  {option.priceAdjustment.toFixed(2)}
                </span>
              </div>
            )
        )}

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center font-bold">
            <span>Final Unit Price:</span>
            <span>${currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Total ({quantity} units):</span>
            <span className="text-lg text-indigo-600">
              ${(currentPrice * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center border rounded-md">
          <button
            className="px-2 sm:px-3 py-1 border-r hover:bg-gray-100"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            className="px-2 sm:px-3 py-1 border-l hover:bg-gray-100"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        disabled={!canAddToCart}
        onClick={handleAddToCart}
      >
        {canAddToCart ? "Add to Cart" : "Please select all options"}
      </button>
    </div>
  );
}
