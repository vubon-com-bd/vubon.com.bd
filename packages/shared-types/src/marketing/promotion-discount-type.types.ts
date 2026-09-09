import { TypeObject } from '../common/types.types';
import { PROMOTION_DISCOUNT_TYPE } from '@vubon/shared-constants/src/marketing/promotion-discount-type.constants';

export interface PromotionDiscountType extends TypeObject {
  type: keyof typeof PROMOTION_DISCOUNT_TYPE.TYPES | string;
  category: 'promotion_discount';
  isPercentage: boolean;
  isFixed: boolean;
  isTiered: boolean;
  isVolume: boolean;
  isBundle: boolean;
}

export type PromotionDiscountTypeKey = keyof typeof PROMOTION_DISCOUNT_TYPE.TYPES;
