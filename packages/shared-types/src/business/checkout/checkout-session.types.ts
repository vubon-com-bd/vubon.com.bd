/**
 * Checkout Session Types
 * চেকআউট সেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CheckoutSession extends BaseEntity {
  sessionId: string;
  userId?: string;
  cartId: string;
  status: 'active' | 'expired' | 'completed' | 'cancelled';
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutSessionCreateInput {
  sessionId: string;
  userId?: string;
  cartId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CheckoutSessionUpdateInput {
  status?: 'active' | 'expired' | 'completed' | 'cancelled';
  metadata?: Record<string, string | number | boolean>;
}

export interface CheckoutSessionResponse {
  checkoutSession: CheckoutSession;
}
