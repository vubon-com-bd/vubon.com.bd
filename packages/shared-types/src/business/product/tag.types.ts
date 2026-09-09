import { BaseEntity } from '../../common/base.types';
import { TAG } from '@vubon/shared-constants/src/business/product/tag.constants';
import { Product } from './product.types';

export interface Tag extends BaseEntity {
  tagId: string;
  name: string;
  slug: string;
  status: keyof typeof TAG.STATUS | string;
  type: keyof typeof TAG.TYPES | string;
  products: Product[];
  productCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
