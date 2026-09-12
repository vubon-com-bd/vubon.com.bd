import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { COMPARISON } from '@vubon/shared-constants/src/business/product/comparison.constants';
import { Product } from './product.types';

export interface Comparison extends BaseEntity {
  comparisonId: string;
  userId: string;
  user: User;
  products: Product[];
  type: keyof typeof COMPARISON.TYPES | string;
  name: string;
  isPublic: boolean;
  metadata: Record<string, unknown>;
}
