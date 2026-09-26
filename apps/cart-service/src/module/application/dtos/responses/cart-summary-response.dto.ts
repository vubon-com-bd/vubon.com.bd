export interface CartSummaryResponseDTO {
  readonly success: true;
  readonly summary: {
    readonly cartId: string;
    readonly status: string;
    readonly itemCount: number;
    readonly subtotal: number;
    readonly discountTotal: number;
    readonly grandTotal: number;
    readonly currency: string;
    readonly hasCoupon: boolean;
    readonly hasVoucher: boolean;
  };
}
