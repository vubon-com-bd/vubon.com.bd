/**
 * Promotion Discount Type Types
 * @module shared-types/marketing
 */

export type PromotionDiscountTypeValue =
  'percentage' | 'fixed' | 'buy_x_get_y' | 'tiered' | 'bundle' | 'free_shipping' | 'cashback';

export interface PromotionDiscountTypeMetadata {
  readonly value: PromotionDiscountTypeValue;
  readonly label: string;
  readonly requiresQuantity: boolean;
}
