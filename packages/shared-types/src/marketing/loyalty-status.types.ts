import { StatusObject } from '../common/status.types';
import { LOYALTY_STATUS } from '@vubon/shared-constants/src/marketing/loyalty-status.constants';

export interface LoyaltyStatus extends StatusObject {
  type: keyof typeof LOYALTY_STATUS | string;
  category: 'loyalty';
  isActive: boolean;
  isInactive: boolean;
  isSuspended: boolean;
  isExpired: boolean;
}

export type LoyaltyStatusKey = keyof typeof LOYALTY_STATUS;
