/**
 * Loyalty Status Value Types
 * @module shared-types/marketing
 */

import type { LOYALTY_STATUS } from '@vubon/shared-constants/marketing';

export type LoyaltyStatusValue = (typeof LOYALTY_STATUS)[keyof typeof LOYALTY_STATUS];

export interface LoyaltyStatusMetadata {
  readonly value: LoyaltyStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
