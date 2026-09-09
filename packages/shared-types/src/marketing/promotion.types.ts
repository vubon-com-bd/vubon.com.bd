import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { PROMOTION_STATUS } from '@vubon/shared-constants/src/marketing/promotion-status.constants';
import { PromotionType } from './promotion-type.types';
import { PromotionDiscountType } from './promotion-discount-type.types';
import { Product } from '../business/product/product.types';
import { Campaign } from './campaign.types';

export interface Promotion extends BaseEntity {
  promotionId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof PROMOTION_STATUS | string;
  type: PromotionType;
  discountType: PromotionDiscountType;
  discountValue: number;
  discountAmount: Money;
  minPurchaseAmount?: Money;
  maxDiscountAmount?: Money;
  products: Product[];
  productCount: number;
  campaignId?: string;
  campaign?: Campaign;
  usageLimit: number;
  usageCount: number;
  perUserLimit: number;
  perUserCount: number;
  isActive: boolean;
  isValid: boolean;
  isStackable: boolean;
  startsAt: Date;
  endsAt: Date;
  metadata: Record<string, unknown>;
}
