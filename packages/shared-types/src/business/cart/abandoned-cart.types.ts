/**
 * Abandoned Cart Types
 * পরিত্যক্ত কার্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { ABANDONED_CART } from '@vubon/shared-constants';

export interface AbandonedCart extends BaseEntity {
  userId: string;
  user?: User;
  sessionId?: string;
  cartId?: string;
  status: (typeof ABANDONED_CART.STATUS)[keyof typeof ABANDONED_CART.STATUS];
  itemsCount: number;
  subtotal: number;
  total: number;
  currency: string;
  abandonedAt: Date;
  recoveryAttempts: number;
  lastRecoveryAt?: Date;
  recoveredAt?: Date;
  convertedAt?: Date;
  reason?: (typeof ABANDONED_CART.REASONS)[keyof typeof ABANDONED_CART.REASONS];
  emailSentAt?: Date;
  smsSentAt?: Date;
  pushSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AbandonedCartCreateInput {
  userId?: string;
  sessionId?: string;
  cartId?: string;
  itemsCount: number;
  subtotal: number;
  total: number;
  currency?: string;
  reason?: (typeof ABANDONED_CART.REASONS)[keyof typeof ABANDONED_CART.REASONS];
}

export interface AbandonedCartUpdateInput {
  status?: (typeof ABANDONED_CART.STATUS)[keyof typeof ABANDONED_CART.STATUS];
  recoveryAttempts?: number;
  lastRecoveryAt?: Date;
  recoveredAt?: Date;
  convertedAt?: Date;
  emailSentAt?: Date;
  smsSentAt?: Date;
  pushSentAt?: Date;
}

export interface AbandonedCartResponse {
  abandonedCart: AbandonedCart;
}

export interface AbandonedCartStats {
  totalAbandoned: number;
  recovered: number;
  converted: number;
  recoveryRate: number;
  conversionRate: number;
  totalValue: number;
  averageValue: number;
}
