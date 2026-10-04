/**
 * CartResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface CartItemResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly unitPrice: number;
  readonly compareAtPrice?: number;
  readonly quantity: number;
  readonly lineSubtotal: number;
  readonly discountAmount: number;
  readonly lineTotal: number;
  readonly status: string;
  readonly isAvailable: boolean;
  readonly isSelected: boolean;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly addedAt: string;
  readonly updatedAt: string;
}

export interface CartResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly currency: string;
  readonly notes?: string;
  readonly items: readonly CartItemResponseDTO[];
  readonly itemCount: number;
  readonly uniqueItemCount: number;
  readonly selectedItemCount: number;
  readonly couponCode?: string;
  readonly voucherCode?: string;
  readonly totals: {
    readonly currency: string;
    readonly itemCount: number;
    readonly subtotal: number;
    readonly itemDiscounts: number;
    readonly couponDiscount: number;
    readonly voucherDiscount: number;
    readonly taxAmount: number;
    readonly shippingAmount: number;
    readonly grandTotal: number;
  };
  readonly expiresAt: string;
  readonly lastActivityAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
