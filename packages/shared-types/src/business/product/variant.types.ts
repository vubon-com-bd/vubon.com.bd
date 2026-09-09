import { BaseEntity } from '../../common/base.types';
import { VARIANT } from '@vubon/shared-constants/src/business/product/variant.constants';
import { Product } from './product.types';
import { Pricing } from './pricing.types';
import { Inventory } from './inventory.types';

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface Variant extends BaseEntity {
  variantId: string;
  productId: string;
  product: Product;
  name: string;
  sku: string;
  status: keyof typeof VARIANT.STATUS | string;
  type: keyof typeof VARIANT.TYPES | string;
  attributes: VariantAttribute[];
  pricing: Pricing;
  inventory: Inventory;
  images: string[];
  isDefault: boolean;
  isActive: boolean;
  order: number;
  metadata: Record<string, unknown>;
}
