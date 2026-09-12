export interface VendorAnalyticsData {
  isActive: boolean;
  sales?: number;
  commission?: number;
  rating?: number;
}

export interface VendorAnalyticsResult<T> {
  totalVendors: number;
  activeVendors: number;
  totalSales: number;
  totalCommission: number;
  averageRating: number;
  topVendors: T[];
}

export const calculateVendorAnalytics = <T extends VendorAnalyticsData>(
  vendors: T[]
): VendorAnalyticsResult<T> => {
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.isActive).length;
  const totalSales = vendors.reduce((sum, v) => sum + (v.sales || 0), 0);
  const totalCommission = vendors.reduce((sum, v) => sum + (v.commission || 0), 0);
  const ratings = vendors.map((v) => v.rating || 0);
  const averageRating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  const sortedVendors = [...vendors].sort((a, b) => (b.sales || 0) - (a.sales || 0));
  return {
    totalVendors,
    activeVendors,
    totalSales,
    totalCommission,
    averageRating,
    topVendors: sortedVendors.slice(0, 10),
  };
};
