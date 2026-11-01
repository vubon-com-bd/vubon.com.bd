/**
 * Cart Summary Response DTO
 * @module cart-service/application/dtos/responses
 *
 * Lightweight projection for dashboards/list views.
 */
import type { CartStatusValue } from '../../../domain/value-objects/primitives/cart-status.vo.js';

export interface CartSummaryFullResponseDTO {
  readonly id: string;
  readonly status: CartStatusValue;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
  readonly lastActivityAt: string;
}

export interface CartSummaryListResponseDTO {
  readonly items: readonly CartSummaryFullResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
