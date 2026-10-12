/**
 * VendorStatsResponseDto
 * @module vendor-service/application/dtos/responses
 */
export interface VendorStatsResponseDto {
  readonly vendorId: string;
  readonly totalProducts: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly totalRefunds: number;
  readonly netRevenue: number;
  readonly averageOrderValue: number;
  readonly averageRating: number;
  readonly fulfillmentRate: number;
  readonly cancellationRate: number;
  readonly currency: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
}
