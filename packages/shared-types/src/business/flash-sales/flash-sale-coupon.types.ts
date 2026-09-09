import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { FLASH_SALE_COUPON } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-coupon.constants';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleCoupon extends BaseEntity {
  couponId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  code: string;
  status: keyof typeof FLASH_SALE_COUPON.STATUS | string;
  type: keyof typeof FLASH_SALE_COUPON.COUPON_TYPES | string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscountAmount?: Money;
  minPurchaseAmount?: Money;
  usageLimit: number;
  usageCount: number;
  perUserLimit: number;
  perUserCount: number;
  isActive: boolean;
  isValid: boolean;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
