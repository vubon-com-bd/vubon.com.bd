export interface InventoryAnalyticsData {
  price?: number;
  quantity?: number;
}

export interface InventoryAnalyticsResult {
  totalInventory: number;
  stockValue: number;
  turnoverRate: number;
  daysOfInventory: number;
  outOfStockItems: number;
  lowStockItems: number;
  overstockItems: number;
}

export const calculateInventoryAnalytics = (
  inventory: InventoryAnalyticsData[]
): InventoryAnalyticsResult => {
  const totalInventory = inventory.length;
  const stockValue = inventory.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0);
  const outOfStockItems = inventory.filter((i) => (i.quantity || 0) <= 0).length;
  const lowStockItems = inventory.filter(
    (i) => (i.quantity || 0) > 0 && (i.quantity || 0) <= 10
  ).length;
  const overstockItems = inventory.filter((i) => (i.quantity || 0) > 100).length;
  return {
    totalInventory,
    stockValue,
    turnoverRate: 0,
    daysOfInventory: 0,
    outOfStockItems,
    lowStockItems,
    overstockItems,
  };
};
