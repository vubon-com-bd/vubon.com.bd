export class VendorStatsResponseDto {
  vendorId!: string;
  totalOrders!: number;
  totalRevenue!: number;
  totalCommission!: number;
  totalPayout!: number;
  averageRating!: number;
  activeProducts!: number;
  pendingReviews!: number;
}
