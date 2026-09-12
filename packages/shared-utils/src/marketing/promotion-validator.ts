import { PROMOTION_STATUS } from '@vubon/shared-constants/src/marketing/promotion-status.constants';

export interface PromotionInput {
  name: string;
  slug: string;
  status: string;
  type: string;
  discountValue: number;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
}

export const validatePromotion = (
  promotion: Partial<PromotionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!promotion.name) errors.push('Promotion name is required');
  if (!promotion.slug) errors.push('Promotion slug is required');
  if (promotion.status && !Object.keys(PROMOTION_STATUS).includes(promotion.status)) {
    errors.push('Invalid promotion status');
  }
  if (promotion.discountValue !== undefined && promotion.discountValue < 0) {
    errors.push('Discount value cannot be negative');
  }
  if (
    promotion.startsAt &&
    promotion.endsAt &&
    new Date(promotion.startsAt) > new Date(promotion.endsAt)
  ) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};

export const isPromotionActive = (promotion: PromotionInput): boolean => {
  const now = new Date();
  return (
    promotion.isActive &&
    promotion.status === 'active' &&
    now >= promotion.startsAt &&
    now <= promotion.endsAt
  );
};
