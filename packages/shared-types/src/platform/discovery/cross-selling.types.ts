import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { CROSS_SELLING } from '@vubon/shared-constants/src/platform/discovery/cross-selling.constants';

export interface CrossSelling extends BaseEntity {
  crossSellingId: string;
  productId: string;
  product: Product;
  type: keyof typeof CROSS_SELLING.TYPES | string;
  crossSellProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
