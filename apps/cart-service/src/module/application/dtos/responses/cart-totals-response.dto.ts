/**
 * CartTotalsResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface CartTotalsResponseDTO {
  readonly currency: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly itemDiscounts: number;
  readonly couponDiscount: number;
  readonly voucherDiscount: number;
  readonly totalDiscounts: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly grandTotal: number;
  readonly discountPercent: number;
  readonly hasDiscount: boolean;
  readonly hasFreeShipping: boolean;
}
