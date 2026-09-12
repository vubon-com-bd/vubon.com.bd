import { StatusObject } from '../common/status.types';
import { PROMOTION_STATUS } from '@vubon/shared-constants/src/marketing/promotion-status.constants';

export interface PromotionStatus extends StatusObject {
  type: keyof typeof PROMOTION_STATUS | string;
  category: 'promotion';
  isDraft: boolean;
  isPending: boolean;
  isActive: boolean;
  isInactive: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  isCompleted: boolean;
}

export type PromotionStatusKey = keyof typeof PROMOTION_STATUS;
