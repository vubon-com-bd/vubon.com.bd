export class VendorAnalyticsResponseDto {
  vendorId!: string;
  periodStart!: string;
  periodEnd!: string;
  ordersTrend!: readonly { date: string; count: number }[];
  revenueTrend!: readonly { date: string; amount: number }[];
  topProducts!: readonly { productId: string; orders: number }[];
}
