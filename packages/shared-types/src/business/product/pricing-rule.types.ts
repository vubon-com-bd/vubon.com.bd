import { BaseEntity } from '../../common/base.types';
import { PRICING_RULE } from '@vubon/shared-constants/src/business/product/pricing-rule.constants';
import { Product } from './product.types';
import { Category } from './category.types';
import { Brand } from './brand.types';

export interface PricingRuleDiscount {
  type: 'percentage' | 'fixed';
  value: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface PricingRuleCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'not_in';
  value: unknown;
}

export interface PricingRule extends BaseEntity {
  ruleId: string;
  name: string;
  description?: string;
  type: keyof typeof PRICING_RULE.TYPES | string;
  priority: keyof typeof PRICING_RULE.PRIORITY_LEVELS | string;
  discount: PricingRuleDiscount;
  conditions: PricingRuleCondition[];
  products?: Product[];
  categories?: Category[];
  brands?: Brand[];
  isActive: boolean;
  startsAt?: Date;
  endsAt?: Date;
  usageLimit?: number;
  usageCount: number;
  metadata: Record<string, unknown>;
}
