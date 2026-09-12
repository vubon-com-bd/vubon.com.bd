import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { AFFILIATE_PAYOUT } from '@vubon/shared-constants/src/marketing/affiliate-payout.constants';
import { Affiliate } from './affiliate.types';

export interface AffiliatePayout extends BaseEntity {
  payoutId: string;
  affiliateId: string;
  affiliate: Affiliate;
  status: keyof typeof AFFILIATE_PAYOUT.STATUS | string;
  method: keyof typeof AFFILIATE_PAYOUT.PAYOUT_METHODS | string;
  amount: Money;
  fee: Money;
  netAmount: Money;
  reference: string;
  description?: string;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
