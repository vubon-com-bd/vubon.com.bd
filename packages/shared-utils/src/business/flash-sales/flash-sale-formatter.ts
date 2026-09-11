export const formatFlashSalePrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatFlashSaleDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export const formatFlashSalePercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export interface FlashSaleFormatData {
  name: string;
  discountPercentage: number;
  soldCount: number;
  remainingCount: number;
  totalLimit: number;
  schedule: { startDate: Date; endDate: Date };
}

export const formatFlashSaleSummary = (sale: FlashSaleFormatData): string => {
  const discount = formatFlashSalePercentage(sale.discountPercentage);
  const remaining = sale.remainingCount || 0;
  const sold = sale.soldCount || 0;
  return `${sale.name} | ${discount} off | ${sold} sold | ${remaining} remaining`;
};

export const formatFlashSaleTime = (sale: FlashSaleFormatData): string => {
  const start = formatFlashSaleDate(sale.schedule.startDate);
  const end = formatFlashSaleDate(sale.schedule.endDate);
  return `${start} - ${end}`;
};

export const formatFlashSaleProgress = (sale: FlashSaleFormatData): string => {
  const progress = sale.totalLimit === 0 ? 0 : (sale.soldCount / sale.totalLimit) * 100;
  return `${progress.toFixed(1)}% sold`;
};
