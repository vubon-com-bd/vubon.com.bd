import { BaseEntity } from '../../common/base.types';
import { COLLECTION } from '@vubon/shared-constants/src/business/product/collection.constants';
import { Product } from './product.types';

export interface Collection extends BaseEntity {
  collectionId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof COLLECTION.STATUS | string;
  type: keyof typeof COLLECTION.TYPES | string;
  products: Product[];
  productCount: number;
  image?: string;
  banner?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  startsAt?: Date;
  endsAt?: Date;
  metadata: Record<string, unknown>;
}
