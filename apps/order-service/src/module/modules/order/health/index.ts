/**
 * Order Feature Health Indicator — DB_MODE-agnostic
 * @module order-service/modules/order/health
 *
 * Injects domain ORDER_REPOSITORY (DI token), not concrete Prisma repo.
 * Works in both memory and prisma modes.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';

export interface OrderFeatureHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class OrderFeatureHealthIndicator {
  private readonly logger = new Logger(OrderFeatureHealthIndicator.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  async check(): Promise<OrderFeatureHealthReport> {
    try {
      const rows = await this.repo.findAll();
      return {
        name: 'order-repository',
        healthy: true,
        message: `${rows.length} records`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Order feature health failed: ${msg}`);
      return { name: 'order-repository', healthy: false, message: msg };
    }
  }
}
