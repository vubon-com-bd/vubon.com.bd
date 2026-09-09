import { StatusObject } from '../common/status.types';
import { AFFILIATE_STATUS } from '@vubon/shared-constants/src/marketing/affiliate-status.constants';

export interface AffiliateStatus extends StatusObject {
  type: keyof typeof AFFILIATE_STATUS | string;
  category: 'affiliate';
  isPending: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isActive: boolean;
  isInactive: boolean;
  isSuspended: boolean;
  isBanned: boolean;
}

export type AffiliateStatusKey = keyof typeof AFFILIATE_STATUS;
