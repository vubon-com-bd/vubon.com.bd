/**
 * Affiliate Commission Types
 * @module shared-types/marketing
 */

import type { AFFILIATE_COMMISSION_TYPE } from '@vubon/shared-constants/marketing';
import type { Money } from '../common/primitives';

export type AffiliateCommissionTypeValue =
  (typeof AFFILIATE_COMMISSION_TYPE)[keyof typeof AFFILIATE_COMMISSION_TYPE];

export interface AffiliateCommission {
  readonly affiliateId: string;
  readonly type: AffiliateCommissionTypeValue;
  readonly percent?: number;
  readonly fixedAmount?: Money;
  readonly currency: string;
  readonly tier?: string;
  readonly isActive: boolean;
  readonly updatedAt: string;
}

export interface AffiliateCommissionTier {
  readonly tier: string;
  readonly minSales: number;
  readonly maxSales: number | null;
  readonly percent: number;
}
