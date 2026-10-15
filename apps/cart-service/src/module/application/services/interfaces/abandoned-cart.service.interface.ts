/**
 * IAbandonedCartService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  AbandonedCartResponseDTO,
  AbandonedCartPublicResponseDTO,
  AbandonedCartListResponseDTO,
  AbandonedCartStatsResponseDTO,
} from '../../dtos/responses/abandoned-cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ABANDONED_CART_SERVICE = Symbol('ABANDONED_CART_SERVICE');

// ─── Filter / Options ─────────────────────
export interface AbandonedCartListFilterDTO {
  readonly userId?: string;
  readonly cartId?: string;
  readonly status?: string;
  readonly minCartValue?: number;
  readonly maxCartValue?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface AbandonedCartListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'abandonedAt' | 'cartValue';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AbandonedCartListFilterDTO;
}

// ─── Contract ─────────────────────────────
export interface IAbandonedCartService {
  /**
   * Detect and register an abandoned cart.
   */
  detect(
    cartId: string,
    actorId?: string,
  ): Promise<AbandonedCartResponseDTO>;

  /**
   * Send a reminder to the abandoned cart owner.
   */
  sendReminder(
    abandonedCartId: string,
    channel: 'email' | 'sms' | 'push',
    actorId?: string,
  ): Promise<AbandonedCartResponseDTO>;

  /**
   * Mark the abandoned cart as recovered.
   */
  recover(
    abandonedCartId: string,
    orderId: string,
    actorId?: string,
  ): Promise<AbandonedCartResponseDTO>;

  /**
   * Mark the abandoned cart as lost.
   */
  markLost(
    abandonedCartId: string,
    reason: string,
    actorId?: string,
  ): Promise<AbandonedCartResponseDTO>;

  getById(id: string): Promise<AbandonedCartResponseDTO>;
  getPublicById(id: string): Promise<AbandonedCartPublicResponseDTO>;
  list(options: AbandonedCartListOptionsDTO): Promise<AbandonedCartListResponseDTO>;
  getStats(filter?: AbandonedCartListFilterDTO): Promise<AbandonedCartStatsResponseDTO>;
}
