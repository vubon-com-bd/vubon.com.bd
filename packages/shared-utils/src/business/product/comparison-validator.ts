export interface ComparisonInput {
  products: string[];
}

export const validateComparison = (
  comparison: Partial<ComparisonInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!comparison.products || comparison.products.length < 2) {
    errors.push('At least 2 products are required for comparison');
  }
  if (comparison.products && comparison.products.length > 5) {
    errors.push('Maximum 5 products can be compared');
  }
  return { isValid: errors.length === 0, errors };
};
