import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { CART_MERGER } from '@vubon/shared-constants/src/business/cart/cart-merger.constants';
import { Cart } from './cart.types';

export interface MergedItem {
  itemId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  source: 'source' | 'target';
}

export interface MergeConflict {
  itemId: string;
  field: string;
  sourceValue: unknown;
  targetValue: unknown;
  resolvedValue?: unknown;
  resolvedBy?: string;
}

export interface CartMerger extends BaseEntity {
  mergerId: string;
  userId: string;
  user: User;
  sourceCartId: string;
  sourceCart: Cart;
  targetCartId: string;
  targetCart: Cart;
  status: keyof typeof CART_MERGER.STATUS | string;
  type: keyof typeof CART_MERGER.TYPES | string;
  strategy: keyof typeof CART_MERGER.MERGE_STRATEGY | string;
  mergedItems: MergedItem[];
  conflicts: MergeConflict[];
  mergedAt?: Date;
  metadata: Record<string, unknown>;
}
