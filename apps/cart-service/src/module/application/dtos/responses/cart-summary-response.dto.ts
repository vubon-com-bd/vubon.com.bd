/**
 * CartSummaryResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface CartSummaryResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly itemCount: number;
  readonly uniqueItemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly hasCoupon: boolean;
  readonly hasVoucher: boolean;
  readonly lastActivityAt: string;
}
