/**
 * Format Stock Status
 * স্টক স্ট্যাটাস ফরম্যাট করা
 */
export const formatStockStatus = (
  quantity: number
): {
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  label: string;
  color: string;
  labelBangla: string;
} => {
  let status: 'in_stock' | 'low_stock' | 'out_of_stock';
  let label: string;
  let labelBangla: string;
  let color: string;

  if (quantity <= 0) {
    status = 'out_of_stock';
    label = 'Out of Stock';
    labelBangla = 'স্টক শেষ';
    color = 'text-red-600 bg-red-100';
  } else if (quantity < 10) {
    status = 'low_stock';
    label = 'Low Stock';
    labelBangla = 'স্টক কম';
    color = 'text-yellow-600 bg-yellow-100';
  } else {
    status = 'in_stock';
    label = 'In Stock';
    labelBangla = 'স্টক আছে';
    color = 'text-green-600 bg-green-100';
  }

  return {
    status,
    label,
    labelBangla,
    color,
  };
};

/**
 * Format Stock Quantity
 * স্টক পরিমাণ ফরম্যাট করা
 */
export const formatStockQuantity = (
  quantity: number,
  threshold: number = 10
): { formatted: string; isLow: boolean; isOutOfStock: boolean } => {
  return {
    formatted: quantity.toString(),
    isLow: quantity > 0 && quantity < threshold,
    isOutOfStock: quantity <= 0,
  };
};

/**
 * Format Stock Level
 * স্টক লেভেল ফরম্যাট করা
 */
export const formatStockLevel = (
  quantity: number,
  maxQuantity: number
): { level: number; percentage: number; bar: string } => {
  const percentage = Math.min((quantity / maxQuantity) * 100, 100);
  const level = Math.floor(percentage / 10);

  // Create visual bar (10 characters max)
  const filled = Math.floor(percentage / 10);
  const empty = 10 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  return {
    level,
    percentage: Math.round(percentage),
    bar,
  };
};

/**
 * Format Restock Date
 * রিস্টক তারিখ ফরম্যাট করা
 */
export const formatRestockDate = (
  date: Date | string
): {
  formatted: string;
  isOverdue: boolean;
  daysUntil: number;
} => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = d.getTime() - now.getTime();
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    formatted: d.toLocaleDateString(),
    isOverdue: daysUntil < 0,
    daysUntil,
  };
};

/**
 * Format Stock Movement
 * স্টক মুভমেন্ট ফরম্যাট করা
 */
export const formatStockMovement = (
  quantity: number,
  type: 'in' | 'out'
): { formatted: string; sign: '+' | '-'; color: string } => {
  const sign = type === 'in' ? '+' : '-';
  const formatted = `${sign}${quantity}`;
  const color = type === 'in' ? 'text-green-600' : 'text-red-600';

  return {
    formatted,
    sign,
    color,
  };
};
