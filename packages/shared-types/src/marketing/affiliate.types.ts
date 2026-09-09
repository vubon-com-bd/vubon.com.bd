import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { User } from '../user/user.types';
import { AFFILIATE_STATUS } from '@vubon/shared-constants/src/marketing/affiliate-status.constants';
import { AffiliateCommission } from './affiliate-commission.types';
import { AffiliatePayout } from './affiliate-payout.types';

export interface Affiliate extends BaseEntity {
  affiliateId: string;
  userId: string;
  user: User;
  code: string;
  status: keyof typeof AFFILIATE_STATUS | string;
  commission: AffiliateCommission;
  payouts: AffiliatePayout[];
  totalSales: Money;
  totalCommission: Money;
  totalPayout: Money;
  pendingCommission: Money;
  clickCount: number;
  conversionCount: number;
  conversionRate: number;
  referralCount: number;
  isActive: boolean;
  isApproved: boolean;
  approvedAt?: Date;
  metadata: Record<string, unknown>;
}
