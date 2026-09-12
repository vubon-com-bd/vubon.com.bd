export const inventoryConfig = {
  reorderPoint: 10,
  reorderQuantity: 50,
  lowStockThreshold: 10,
  outOfStockThreshold: 0,
  maxStock: 1000,
  reserveTimeout: 15 * 60,
  autoRestock: false,
} as const;
