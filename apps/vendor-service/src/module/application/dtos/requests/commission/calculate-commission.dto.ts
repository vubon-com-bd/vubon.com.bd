/**
 * Calculate Commission Request DTO
 * @module vendor-service/application/dtos/requests/commission
 */
export interface CalculateCommissionRequestDTO {
  readonly vendorId: string;
  readonly orderAmount: number;
  readonly categoryId?: string;
  readonly shippingAmount?: number;
  readonly taxAmount?: number;
  readonly discountAmount?: number;
  readonly currency?: string;
}
