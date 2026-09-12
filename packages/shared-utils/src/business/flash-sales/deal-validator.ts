import { DEAL_STATUS } from '@vubon/shared-constants/src/business/flash-sales/deal-status.constants';
import { DEAL } from '@vubon/shared-constants/src/business/flash-sales/deal.constants';

export interface DealInput {
  name: string;
  slug: string;
  status: string;
  type: string;
  discountValue: number;
  isActive: boolean;
}

export const isValidDealSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

export const validateDeal = (deal: Partial<DealInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!deal.name) errors.push('Deal name is required');
  if (!deal.slug) errors.push('Deal slug is required');
  if (deal.slug && !isValidDealSlug(deal.slug)) {
    errors.push('Invalid slug format');
  }
  if (deal.status && !Object.keys(DEAL_STATUS).includes(deal.status)) {
    errors.push('Invalid deal status');
  }
  if (deal.type && !Object.keys(DEAL.TYPES).includes(deal.type)) {
    errors.push('Invalid deal type');
  }
  if (deal.discountValue !== undefined && deal.discountValue < 0) {
    errors.push('Discount value cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isDealActive = (deal: DealInput): boolean => {
  return deal.isActive && deal.status === 'active';
};
