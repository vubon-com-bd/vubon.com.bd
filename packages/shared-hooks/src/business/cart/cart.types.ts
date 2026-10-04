export interface CartItem {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
}

export interface Cart {
  readonly id: string;
  readonly items: readonly CartItem[];
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly currency: string;
  readonly couponCode?: string;
}
