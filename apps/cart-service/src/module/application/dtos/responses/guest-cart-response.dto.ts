/**
 * Guest Cart Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { GuestCartStatusValue } from '../../../domain/value-objects/primitives/guest-cart-status.vo.js';

// ─── Full (admin) ─────────────────────────
export interface GuestCartResponseDTO {
  readonly id: string;
  readonly token: string;
  readonly cartId: string;
  readonly status: GuestCartStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expiresAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface GuestCartPublicResponseDTO {
  readonly id: string;
  readonly token: string;
  readonly status: GuestCartStatusValue;
  readonly itemCount: number;
  readonly expiresAt: string;
}

// ─── Initiate ─────────────────────────────
export interface GuestCartInitiateResponseDTO {
  readonly success: true;
  readonly guestCartId: string;
  readonly token: string;
  readonly expiresAt: string;
}
