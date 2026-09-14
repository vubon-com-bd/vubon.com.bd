/**
 * Affiliate Core Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { UserId, Email } from '../common/primitives';
import type { AffiliateStatusValue } from './affiliate-status.types';
import type { AffiliateCommission } from './affiliate-commission.types';

export type AffiliateTypeValue =
  | 'individual'
  | 'business'
  | 'influencer'
  | 'blogger'
  | 'coupon_site'
  | 'cashback_site'
  | 'comparison_site'
  | 'agency';

export interface Affiliate extends BaseEntity<string> {
  readonly userId?: UserId;
  readonly name: string;
  readonly email: Email;
  readonly type: AffiliateTypeValue;
  readonly status: AffiliateStatusValue;
  readonly commission: AffiliateCommission;
  readonly referralCode: string;
  readonly website?: string;
  readonly socialProfiles?: readonly string[];
  readonly country?: string;
  readonly totalEarnings: number;
  readonly totalPayouts: number;
  readonly currency: string;
  readonly approvedBy?: UserId;
  readonly approvedAt?: string;
  readonly joinedAt: string;
}

export interface AffiliatePublic {
  readonly id: string;
  readonly name: string;
  readonly status: AffiliateStatusValue;
  readonly referralCode: string;
  readonly totalEarnings: number;
  readonly currency: string;
}

export interface AffiliateListFilter {
  readonly status?: AffiliateStatusValue;
  readonly type?: AffiliateTypeValue;
  readonly country?: string;
  readonly search?: string;
}
