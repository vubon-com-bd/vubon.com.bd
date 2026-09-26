export interface CartItemResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly currency: string;
  readonly status: string;
  readonly note?: string;
  readonly selected: boolean;
}
