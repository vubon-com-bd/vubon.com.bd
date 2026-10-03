/**
 * Promotion Type Value Types
 * @module shared-types/marketing
 */

import type { PROMOTION_TYPE, PROMOTION_APPLIES_TO } from '@vubon/shared-constants/marketing';

export type PromotionTypeValue = (typeof PROMOTION_TYPE)[keyof typeof PROMOTION_TYPE];

export type PromotionAppliesToValue =
  (typeof PROMOTION_APPLIES_TO)[keyof typeof PROMOTION_APPLIES_TO];

export interface PromotionTypeMetadata {
  readonly value: PromotionTypeValue;
  readonly label: string;
  readonly isPercentage: boolean;
  readonly isFixed: boolean;
}
