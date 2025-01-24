export interface CartItemType {
  variant: {
    _key: string;
    name: string;
    productName: string;
    imageUrl?: string;
    stock: number;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options?: Record<
    string,
    {
      _key: string;
      value: string;
      priceAdjustment: number;
    }
  >;
}
