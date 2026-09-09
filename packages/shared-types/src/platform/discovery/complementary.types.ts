import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { COMPLEMENTARY } from '@vubon/shared-constants/src/platform/discovery/complementary.constants';

export interface Complementary extends BaseEntity {
  complementaryId: string;
  productId: string;
  product: Product;
  type: keyof typeof COMPLEMENTARY.TYPES | string;
  complementaryProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
