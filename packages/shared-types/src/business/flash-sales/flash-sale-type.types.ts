import { TypeObject } from '../../common/types.types';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-type.constants';

export interface FlashSaleType extends TypeObject {
  type: keyof typeof FLASH_SALE_TYPE | string;
  category: 'flash_sale';
  durationHours: number;
  maxProducts: number;
  maxDiscount: number;
  isRecurring: boolean;
}

export type FlashSaleTypeKey = keyof typeof FLASH_SALE_TYPE;
