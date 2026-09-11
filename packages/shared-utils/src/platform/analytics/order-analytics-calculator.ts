export interface OrderAnalyticsData {
  status: string;
}

export interface OrderAnalyticsResult {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
  averageFulfillmentTime: number;
}

export const calculateOrderAnalytics = (orders: OrderAnalyticsData[]): OrderAnalyticsResult => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;
  const returnedOrders = orders.filter((o) => o.status === 'returned').length;
  return {
    totalOrders,
    completedOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    cancelledOrders,
    returnedOrders,
    averageFulfillmentTime: 0,
  };
};
