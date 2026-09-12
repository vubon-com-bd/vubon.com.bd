import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';
import { SAVED_FOR_LATER } from '@vubon/shared-constants/src/business/cart/saved-for-later.constants';

export interface SavedForLater extends BaseEntity {
  savedId: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  status: keyof typeof SAVED_FOR_LATER.STATUS | string;
  type: keyof typeof SAVED_FOR_LATER.TYPES | string;
  quantity: number;
  notes?: string;
  savedAt: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
