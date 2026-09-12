import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { UPSELLING } from '@vubon/shared-constants/src/platform/discovery/upselling.constants';

export interface Upselling extends BaseEntity {
  upsellingId: string;
  productId: string;
  product: Product;
  type: keyof typeof UPSELLING.TYPES | string;
  upsellProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
