import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { DEAL_STATUS } from '@vubon/shared-constants/src/business/flash-sales/deal-status.constants';
import { DEAL } from '@vubon/shared-constants/src/business/flash-sales/deal.constants';
import { Product } from '../product/product.types';
import { DealDiscountType } from './deal-discount-type.types';
import { DealRule } from './deal-rule.types';

export interface Deal extends BaseEntity {
  dealId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof DEAL_STATUS | string;
  type: keyof typeof DEAL.TYPES | string;
  products: Product[];
  productCount: number;
  discountType: DealDiscountType;
  discountValue: number;
  discountAmount: Money;
  minPurchaseAmount?: Money;
  maxPurchaseAmount?: Money;
  perUserLimit: number;
  totalLimit: number;
  usedCount: number;
  remainingCount: number;
  isActive: boolean;
  isFeatured: boolean;
  startsAt: Date;
  endsAt: Date;
  rules: DealRule[];
  metadata: Record<string, unknown>;
}
