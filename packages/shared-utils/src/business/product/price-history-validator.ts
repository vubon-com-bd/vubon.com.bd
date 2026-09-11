export interface PriceHistoryInput {
  oldPrice: number;
  newPrice: number;
}

export const validatePriceHistory = (
  history: Partial<PriceHistoryInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (history.oldPrice === undefined) errors.push('Old price is required');
  if (history.newPrice === undefined) errors.push('New price is required');
  if (history.oldPrice !== undefined && history.oldPrice < 0) {
    errors.push('Old price cannot be negative');
  }
  if (history.newPrice !== undefined && history.newPrice < 0) {
    errors.push('New price cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
