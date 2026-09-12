import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';
import { PRICING } from '@vubon/shared-constants/src/business/product/pricing.constants';
import { Product } from './product.types';
import { Variant } from './variant.types';

export interface PricingDiscount {
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface PricingTax {
  type: string;
  rate: number;
  isInclusive: boolean;
}

export interface Pricing extends BaseEntity {
  pricingId: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  type: keyof typeof PRICING.TYPES | string;
  price: Money;
  compareAtPrice?: Money;
  cost?: Money;
  currency: keyof typeof CURRENCY | string;
  discount: PricingDiscount;
  tax: PricingTax;
  isOnSale: boolean;
  salePrice?: Money;
  saleStartAt?: Date;
  saleEndAt?: Date;
  metadata: Record<string, unknown>;
}
