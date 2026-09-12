import { BUNDLE_DEAL } from '@vubon/shared-constants/src/business/flash-sales/bundle-deal.constants';

export interface BundleDealInput {
  products: unknown[];
  originalPrice: number;
  bundlePrice: number;
  status: string;
}

export const validateBundleDeal = (
  deal: Partial<BundleDealInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!deal.products || deal.products.length < 2) {
    errors.push('At least 2 products are required for bundle deal');
  }
  if (deal.originalPrice !== undefined && deal.originalPrice < 0) {
    errors.push('Original price cannot be negative');
  }
  if (deal.bundlePrice !== undefined && deal.bundlePrice < 0) {
    errors.push('Bundle price cannot be negative');
  }
  if (
    deal.originalPrice !== undefined &&
    deal.bundlePrice !== undefined &&
    deal.bundlePrice > deal.originalPrice
  ) {
    errors.push('Bundle price cannot be greater than original price');
  }
  if (deal.status && !Object.keys(BUNDLE_DEAL.STATUS).includes(deal.status)) {
    errors.push('Invalid bundle deal status');
  }
  return { isValid: errors.length === 0, errors };
};
