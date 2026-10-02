/**
 * Affiliate Payout Types
 * @module shared-types/marketing
 */

import type { Money } from '../common/primitives/index.js';
import type { BaseEntity } from '../common/base/index.js';

export type AffiliatePayoutStatusValue =
  'pending' | 'approved' | 'processing' | 'paid' | 'rejected' | 'failed' | 'on_hold';

export interface AffiliatePayout extends BaseEntity<string> {
  readonly affiliateId: string;
  readonly status: AffiliatePayoutStatusValue;
  readonly amount: Money;
  readonly currency: string;
  readonly method: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly reference?: string;
  readonly notes?: string;
  readonly paidAt?: string;
  readonly failureReason?: string;
}

export interface AffiliatePayoutRequest {
  readonly affiliateId: string;
  readonly amount: Money;
  readonly method: string;
  readonly notes?: string;
}

export interface AffiliatePayoutPublic {
  readonly id: string;
  readonly status: AffiliatePayoutStatusValue;
  readonly amount: Money;
  readonly currency: string;
  readonly paidAt?: string;
}
