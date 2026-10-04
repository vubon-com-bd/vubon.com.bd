/**
 * Checkout Session Types
 * @module shared-types/business/checkout
 */
import type { CheckoutId, UserId } from '../../common/primitives/index.js';

export interface CheckoutSession {
  readonly id: string;
  readonly checkoutId: CheckoutId;
  readonly customerId: UserId;
  readonly token: string;
  readonly expiresAt: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly stepData?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CheckoutSessionDTO {
  readonly id: string;
  readonly checkoutId: CheckoutId;
  readonly customerId: UserId;
  readonly token: string;
  readonly expiresAt: string;
  readonly isExpired: boolean;
  readonly remainingMs: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
