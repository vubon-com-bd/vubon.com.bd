export interface CouponResponseDTO {
  readonly code: string;
  readonly discount: number;
  readonly status: string;
  readonly discountType: string;
  readonly appliedAt: string;
}
