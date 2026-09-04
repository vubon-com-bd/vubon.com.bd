/**
 * Flash Sale Wishlist Types
 * ফ্ল্যাশ সেল উইশলিস্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleWishlist extends BaseEntity {
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  status: 'active' | 'inactive' | 'notified' | 'expired';
  notifiedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleWishlistCreateInput {
  flashSaleId: string;
  userId: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleWishlistUpdateInput {
  status?: 'active' | 'inactive' | 'notified' | 'expired';
  notifiedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleWishlistResponse {
  flashSaleWishlist: FlashSaleWishlist;
}

export interface FlashSaleWishlistStats {
  totalWishlists: number;
  activeWishlists: number;
  notifiedCount: number;
}
