import { StatusObject } from '../../common/status.types';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-status.constants';

export interface FlashSaleStatus extends StatusObject {
  type: keyof typeof FLASH_SALE_STATUS | string;
  category: 'flash_sale';
  isDraft: boolean;
  isScheduled: boolean;
  isActive: boolean;
  isEnded: boolean;
  isCancelled: boolean;
  isCompleted: boolean;
}

export type FlashSaleStatusKey = keyof typeof FLASH_SALE_STATUS;
