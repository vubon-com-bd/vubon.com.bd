import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { Product } from '../../business/product/product.types';
import { RECENTLY_VIEWED } from '@vubon/shared-constants/src/platform/discovery/recently-viewed.constants';

export interface RecentlyViewed extends BaseEntity {
  viewedId: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  type: keyof typeof RECENTLY_VIEWED.TYPES | string;
  viewedAt: Date;
  duration: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
