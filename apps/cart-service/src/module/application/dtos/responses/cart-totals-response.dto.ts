export interface CartTotalsResponseDTO {
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}
