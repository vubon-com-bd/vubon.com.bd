/**
 * Stock Formatter.
 */
const LOW_STOCK_THRESHOLD = 10;

export const formatStock = (stock: number): string => {
  if (!Number.isFinite(stock) || stock <= 0) return 'Out of Stock';
  if (stock < LOW_STOCK_THRESHOLD) return `Only ${Math.floor(stock)} left`;
  return `${Math.floor(stock)} in stock`;
};

export const getStockLevel = (stock: number): 'out' | 'low' | 'normal' => {
  if (stock <= 0) return 'out';
  if (stock < LOW_STOCK_THRESHOLD) return 'low';
  return 'normal';
};
