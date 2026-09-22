export interface CartItemPublic {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly selected: boolean;
}

export interface CartResponseDTO {
  readonly success: true;
  readonly cart: {
    readonly id: string;
    readonly userId?: string;
    readonly type: string;
    readonly status: string;
    readonly itemCount: number;
    readonly subtotal: number;
    readonly discountTotal: number;
    readonly taxTotal: number;
    readonly shippingTotal: number;
    readonly grandTotal: number;
    readonly currency: string;
    readonly items: readonly CartItemPublic[];
  };
}
