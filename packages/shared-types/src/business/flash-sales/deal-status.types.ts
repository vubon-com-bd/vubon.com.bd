import { StatusObject } from '../../common/status.types';
import { DEAL_STATUS } from '@vubon/shared-constants/src/business/flash-sales/deal-status.constants';

export interface DealStatus extends StatusObject {
  type: keyof typeof DEAL_STATUS | string;
  category: 'deal';
  isDraft: boolean;
  isActive: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  isCompleted: boolean;
}

export type DealStatusKey = keyof typeof DEAL_STATUS;
