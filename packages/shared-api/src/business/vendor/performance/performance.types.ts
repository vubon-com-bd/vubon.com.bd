export interface VendorPerformance {
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly currency: string;
  readonly avgRating: number;
  readonly fulfillmentRate: number;
  readonly cancellationRate: number;
}
