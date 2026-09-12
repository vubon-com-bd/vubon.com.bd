import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { SUBSTITUTE } from '@vubon/shared-constants/src/platform/discovery/substitute.constants';

export interface Substitute extends BaseEntity {
  substituteId: string;
  productId: string;
  product: Product;
  type: keyof typeof SUBSTITUTE.TYPES | string;
  substituteProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
