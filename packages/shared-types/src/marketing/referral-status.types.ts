import { StatusObject } from '../common/status.types';
import { REFERRAL_STATUS } from '@vubon/shared-constants/src/marketing/referral-status.constants';

export interface ReferralStatus extends StatusObject {
  type: keyof typeof REFERRAL_STATUS | string;
  category: 'referral';
  isPending: boolean;
  isActive: boolean;
  isCompleted: boolean;
  isExpired: boolean;
  isCancelled: boolean;
}

export type ReferralStatusKey = keyof typeof REFERRAL_STATUS;
