/**
 * Abandoned Cart Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { AbandonedCartStatusValue } from '../../../domain/value-objects/primitives/abandoned-cart-status.vo.js';

// ─── Full (admin) ─────────────────────────
export interface AbandonedCartResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly userId?: string;
  readonly email?: string;
  readonly status: AbandonedCartStatusValue;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface AbandonedCartPublicResponseDTO {
  readonly id: string;
  readonly status: AbandonedCartStatusValue;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
}

// ─── List (paginated) ─────────────────────
export interface AbandonedCartListResponseDTO {
  readonly items: readonly AbandonedCartResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface AbandonedCartStatsResponseDTO {
  readonly total: number;
  readonly totalValue: number;
  readonly averageValue: number;
  readonly recoveredCount: number;
  readonly recoveryRate: number;
  readonly byStatus: Readonly<Record<string, number>>;
}
