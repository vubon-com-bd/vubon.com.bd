/**
 * Promotion Status Value Types
 * @module shared-types/marketing
 */

import type { PROMOTION_STATUS } from '@vubon/shared-constants/marketing';

export type PromotionStatusValue = (typeof PROMOTION_STATUS)[keyof typeof PROMOTION_STATUS];

export interface PromotionStatusMetadata {
  readonly value: PromotionStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
