export interface CustomerAnalyticsData {
  isNew?: boolean;
  isRepeat?: boolean;
  lifetimeValue?: number;
  orders?: number;
  revenue?: number;
}

export interface CustomerAnalyticsResult {
  totalCustomers: number;
  newCustomers: number;
  repeatCustomers: number;
  averageLifetimeValue: number;
  averageOrderFrequency: number;
  averageOrderValue: number;
}

export const calculateCustomerAnalytics = (
  customers: CustomerAnalyticsData[]
): CustomerAnalyticsResult => {
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((c) => c.isNew).length;
  const repeatCustomers = customers.filter((c) => c.isRepeat).length;
  const totalLifetimeValue = customers.reduce((sum, c) => sum + (c.lifetimeValue || 0), 0);
  const averageLifetimeValue = totalCustomers > 0 ? totalLifetimeValue / totalCustomers : 0;
  const totalOrders = customers.reduce((sum, c) => sum + (c.orders || 0), 0);
  const averageOrderFrequency = totalCustomers > 0 ? totalOrders / totalCustomers : 0;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  return {
    totalCustomers,
    newCustomers,
    repeatCustomers,
    averageLifetimeValue,
    averageOrderFrequency,
    averageOrderValue,
  };
};
