/**
 * Margin Calculator.
 */
export const calculateMargin = (sellingPrice: number, costPrice: number): number => {
  if (sellingPrice === 0) throw new Error('Selling price cannot be zero');
  return ((sellingPrice - costPrice) / sellingPrice) * 100;
};

export const calculateMarkup = (costPrice: number, margin: number): number => {
  if (margin >= 100) throw new Error('Margin must be less than 100%');
  if (margin < 0) throw new Error('Margin must be non-negative');
  return costPrice / (1 - margin / 100);
};

export const calculateSellingPrice = (costPrice: number, desiredMargin: number): number => {
  if (desiredMargin >= 100) throw new Error('Margin must be less than 100%');
  return costPrice / (1 - desiredMargin / 100);
};
