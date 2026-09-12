import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { FREQUENTLY_BOUGHT } from '@vubon/shared-constants/src/platform/discovery/frequently-bought.constants';

export interface FrequentlyBought extends BaseEntity {
  frequentlyBoughtId: string;
  productId: string;
  product: Product;
  type: keyof typeof FREQUENTLY_BOUGHT.TYPES | string;
  association: string[];
  support: number;
  confidence: number;
  lift: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
