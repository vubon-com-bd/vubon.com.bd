/**
 * Cart Merger Types
 * কার্ট মার্জার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';

export interface CartMerger extends BaseEntity {
  userId: string;
  user?: User;
  guestSessionId: string;
  guestCartId: string;
  userCartId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  itemsMerged: number;
  itemsSkipped: number;
  itemsConflicts: number;
  conflictResolution: 'keep_user' | 'keep_guest' | 'merge' | 'prompt';
  startedAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartMergerCreateInput {
  userId: string;
  guestSessionId: string;
  guestCartId: string;
  userCartId: string;
  conflictResolution?: 'keep_user' | 'keep_guest' | 'merge' | 'prompt';
}

export interface CartMergerUpdateInput {
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  itemsMerged?: number;
  itemsSkipped?: number;
  itemsConflicts?: number;
  completedAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
}

export interface CartMergerResponse {
  cartMerger: CartMerger;
}

export interface CartMergerResult {
  success: boolean;
  mergedItems: number;
  skippedItems: number;
  conflicts: {
    productId: string;
    variantId?: string;
    guestQuantity: number;
    userQuantity: number;
    resolved: boolean;
    resolution: 'keep_user' | 'keep_guest' | 'merged';
  }[];
}
