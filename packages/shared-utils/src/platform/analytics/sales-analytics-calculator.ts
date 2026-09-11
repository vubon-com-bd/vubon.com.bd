export interface SalesAnalyticsData {
  total?: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
}

export interface SalesAnalyticsResult {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  grossRevenue: number;
  netRevenue: number;
  discountAmount: number;
  taxAmount: number;
}

export const calculateSalesAnalytics = (orders: SalesAnalyticsData[]): SalesAnalyticsResult => {
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const grossRevenue = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const discountAmount = orders.reduce((sum, o) => sum + (o.discount || 0), 0);
  const taxAmount = orders.reduce((sum, o) => sum + (o.tax || 0), 0);
  return {
    totalSales,
    totalOrders,
    averageOrderValue,
    grossRevenue,
    netRevenue: totalSales,
    discountAmount,
    taxAmount,
  };
};
