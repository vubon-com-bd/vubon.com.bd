import { TypeObject } from '../../common/types.types';
import { DEAL_DISCOUNT_TYPE } from '@vubon/shared-constants/src/business/flash-sales/deal-discount-type.constants';

export interface DealDiscountType extends TypeObject {
  type: keyof typeof DEAL_DISCOUNT_TYPE | string;
  category: 'deal_discount';
  isPercentage: boolean;
  isFixed: boolean;
  isTiered: boolean;
  isVolume: boolean;
  isBundle: boolean;
}

export type DealDiscountTypeKey = keyof typeof DEAL_DISCOUNT_TYPE;
