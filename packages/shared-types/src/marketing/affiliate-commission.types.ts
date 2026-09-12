import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { AFFILIATE_COMMISSION } from '@vubon/shared-constants/src/marketing/affiliate-commission.constants';
import { Affiliate } from './affiliate.types';

export interface AffiliateCommission extends BaseEntity {
  commissionId: string;
  affiliateId: string;
  affiliate: Affiliate;
  type: keyof typeof AFFILIATE_COMMISSION.TYPES | string;
  rate: number;
  tier: keyof typeof AFFILIATE_COMMISSION.COMMISSION_TIERS | string;
  amount: Money;
  minAmount: Money;
  maxAmount: Money;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
