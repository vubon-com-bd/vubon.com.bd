import { TypeObject } from '../common/types.types';
import { PROMOTION_TYPE } from '@vubon/shared-constants/src/marketing/promotion-type.constants';

export interface PromotionType extends TypeObject {
  type: keyof typeof PROMOTION_TYPE.TYPES | string;
  category: 'promotion_type';
  isPercentage: boolean;
  isFixedAmount: boolean;
  isBuyXGetY: boolean;
  isFreeShipping: boolean;
  isGiftWithPurchase: boolean;
  isBundle: boolean;
  isCoupon: boolean;
  isVoucher: boolean;
  isFlashSale: boolean;
  isEarlyBird: boolean;
  isLastMinute: boolean;
  isVip: boolean;
  isCustom: boolean;
}

export type PromotionTypeKey = keyof typeof PROMOTION_TYPE.TYPES;
