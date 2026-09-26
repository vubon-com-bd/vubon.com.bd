/**
 * Affiliate Status Value Types
 * @module shared-types/marketing
 */

import type { AFFILIATE_STATUS } from '@vubon/shared-constants/marketing';

export type AffiliateStatusValue = (typeof AFFILIATE_STATUS)[keyof typeof AFFILIATE_STATUS];

export interface AffiliateStatusMetadata {
  readonly value: AffiliateStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
