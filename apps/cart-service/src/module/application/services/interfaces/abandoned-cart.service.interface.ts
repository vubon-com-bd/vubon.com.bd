import type {
  AbandonedCartResponseDTO,
  AbandonedCartStatsDTO,
} from '../../dtos/responses/abandoned-cart-response.dto.js';

export const ABANDONED_CART_SERVICE = Symbol('ABANDONED_CART_SERVICE');

export interface IAbandonedCartService {
  detect(cartId: string): Promise<AbandonedCartResponseDTO | null>;
  sendReminder(id: string, channel: 'email' | 'sms' | 'push'): Promise<number>;
  recover(id: string, orderId: string, recoveredValue: number): Promise<AbandonedCartResponseDTO>;
  markLost(id: string, reason: string): Promise<void>;
  listPending(page?: number, limit?: number): Promise<readonly AbandonedCartResponseDTO[]>;
  getStats(fromDate?: string, toDate?: string): Promise<AbandonedCartStatsDTO>;
}
