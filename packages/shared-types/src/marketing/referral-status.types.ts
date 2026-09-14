/**
 * Referral Status Value Types
 * @module shared-types/marketing
 */

import type { REFERRAL_STATUS } from '@vubon/shared-constants/marketing';

export type ReferralStatusValue = (typeof REFERRAL_STATUS)[keyof typeof REFERRAL_STATUS];

export interface ReferralStatusMetadata {
  readonly value: ReferralStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
