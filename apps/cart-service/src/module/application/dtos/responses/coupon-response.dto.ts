/**
 * Coupon Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { CouponStatusValue } from '../../../domain/value-objects/primitives/coupon-status.vo.js';
import type { CouponDiscountType } from '../../../domain/value-objects/primitives/coupon-discount.vo.js';

// ─── Full (admin) ─────────────────────────
export interface CouponResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly code: string;
  readonly status: CouponStatusValue;
  readonly discountType: CouponDiscountType;
  readonly discountValue: number;
  readonly appliedDiscountAmount: number;
  readonly currency: string;
  readonly minOrderAmount?: number;
  readonly expiresAt: string;
  readonly appliedAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface CouponPublicResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly discountType: CouponDiscountType;
  readonly discountValue: number;
  readonly appliedDiscountAmount: number;
  readonly minOrderAmount?: number;
  readonly expiresAt: string;
}

// ─── Validation result ────────────────────
export interface CouponValidationResponseDTO {
  readonly valid: boolean;
  readonly code: string;
  readonly discountAmount: number;
  readonly reason?: string;
}
