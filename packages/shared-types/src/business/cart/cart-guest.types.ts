/**
 * Cart Guest Types
 * কার্ট গেস্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CartGuest extends BaseEntity {
  sessionId: string;
  email?: string;
  phone?: string;
  name?: string;
  ipAddress?: string;
  userAgent?: string;
  cartId?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartGuestCreateInput {
  sessionId: string;
  email?: string;
  phone?: string;
  name?: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt?: Date;
}

export interface CartGuestUpdateInput {
  email?: string;
  phone?: string;
  name?: string;
  cartId?: string;
  expiresAt?: Date;
}

export interface CartGuestResponse {
  cartGuest: CartGuest;
}

export interface CartGuestMergeResult {
  merged: boolean;
  guestId: string;
  userId: string;
  itemsMerged: number;
}
