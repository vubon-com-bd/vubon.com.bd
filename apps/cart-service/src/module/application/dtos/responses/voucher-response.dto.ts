/**
 * Voucher Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { VoucherStatusValue } from '../../../domain/value-objects/primitives/voucher-status.vo.js';

// ─── Full (admin) ─────────────────────────
export interface VoucherResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly code: string;
  readonly status: VoucherStatusValue;
  readonly remainingAmount: number;
  readonly appliedAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface VoucherPublicResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly remainingAmount: number;
  readonly appliedAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
}

// ─── Validation result ────────────────────
export interface VoucherValidationResponseDTO {
  readonly valid: boolean;
  readonly code: string;
  readonly appliedAmount: number;
  readonly remainingAmount: number;
  readonly reason?: string;
}
