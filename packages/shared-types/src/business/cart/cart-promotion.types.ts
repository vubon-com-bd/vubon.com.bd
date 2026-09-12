import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Cart } from './cart.types';

export interface PromotionCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'not_in';
  value: unknown;
}

export interface CartPromotion extends BaseEntity {
  promotionId: string;
  cartId: string;
  cart: Cart;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  discountAmount: Money;
  appliedAt: Date;
  expiresAt?: Date;
  conditions: PromotionCondition[];
  metadata: Record<string, unknown>;
}
