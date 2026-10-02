/**
 * AbandonedCartService — implements IAbandonedCartService
 */
import { Inject, Injectable } from '@nestjs/common';
import type { IAbandonedCartService } from '../interfaces/abandoned-cart.service.interface.js';
import {
  ABANDONED_CART_REPOSITORY,
  type AbandonedCartRepository,
} from '../../../domain/repositories/abandoned-cart.repository.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { AbandonedCartEntity } from '../../../domain/entities/abandoned-cart.entity.js';
import { AbandonedCartDetectorService } from '../../../domain/services/abandoned-cart-detector.service.js';
import type {
  AbandonedCartResponseDTO,
  AbandonedCartStatsDTO,
} from '../../dtos/responses/abandoned-cart-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class AbandonedCartService implements IAbandonedCartService {
  private readonly detector = new AbandonedCartDetectorService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
    @Inject(ABANDONED_CART_REPOSITORY) private readonly abandonedRepo: AbandonedCartRepository,
  ) {}

  async detect(cartId: string): Promise<AbandonedCartResponseDTO | null> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    const decision = this.detector.detect({ cart });
    if (!decision.abandoned) return null;
    const existing = await this.abandonedRepo.findByCartId(cart.toIdVO);
    if (existing) return this.toResponse(existing);
    return null;
  }

  async sendReminder(id: string, channel: 'email' | 'sms' | 'push'): Promise<number> {
    const ab = await this.abandonedRepo.findById(id);
    if (!ab) return 0;
    const count = ab.sendReminder(channel, new Date().toISOString());
    await this.abandonedRepo.save(ab);
    return count;
  }

  async recover(
    id: string,
    orderId: string,
    recoveredValue: number,
  ): Promise<AbandonedCartResponseDTO> {
    const ab = await this.abandonedRepo.findById(id);
    if (!ab) throw new CartNotFoundApplicationError(id);
    ab.recover(orderId, recoveredValue, new Date().toISOString());
    const saved = await this.abandonedRepo.save(ab);
    return this.toResponse(saved);
  }

  async markLost(id: string, reason: string): Promise<void> {
    const ab = await this.abandonedRepo.findById(id);
    if (!ab) return;
    ab.markLost(reason, new Date().toISOString());
    await this.abandonedRepo.save(ab);
  }

  async listPending(page = 1, limit = 20): Promise<readonly AbandonedCartResponseDTO[]> {
    const pending = await this.abandonedRepo.findPending();
    void page;
    void limit;
    return pending.map((p) => this.toResponse(p));
  }

  async getStats(fromDate?: string, toDate?: string): Promise<AbandonedCartStatsDTO> {
    const s = await this.abandonedRepo.getStats(fromDate, toDate);
    return {
      total: s.total,
      pending: s.pending,
      reminded: s.reminded,
      recovered: s.recovered,
      lost: s.lost,
      recoveryRate: s.recoveryRate,
      averageCartValue: s.averageCartValue,
    };
  }

  private toResponse(e: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: e.id,
      cartId: e.cartId.value,
      userId: e.userId?.value,
      email: e.email,
      status: e.status.value,
      reminderType: e.reminderType.value,
      itemCount: e.itemCount,
      cartValue: e.cartValue,
      currency: e.currency,
      abandonedAt: e.abandonedAt,
      remindersSent: e.remindersSent,
      lastReminderAt: e.lastReminderAt,
      recoveredAt: e.recoveredAt,
      recoveredOrderId: e.recoveredOrderId,
    };
  }
}
