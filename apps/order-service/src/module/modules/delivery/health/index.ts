/**
 * Delivery Feature Health Indicator — DB_MODE-agnostic
 * @module order-service/modules/delivery/health
 *
 * Injects domain DELIVERY_REPOSITORY (DI token), not concrete Prisma repo.
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  DELIVERY_REPOSITORY,
  type DeliveryRepository,
} from '../../../domain/repositories/delivery.repository.interface.js';

export interface DeliveryFeatureHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class DeliveryHealthIndicator {
  private readonly logger = new Logger(DeliveryHealthIndicator.name);

  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly repo: DeliveryRepository,
  ) {}

  async check(): Promise<DeliveryFeatureHealthReport> {
    try {
      const rows = await this.repo.findAll();
      return {
        name: 'delivery-repository',
        healthy: true,
        message: `${rows.length} records`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Delivery feature health failed: ${msg}`);
      return { name: 'delivery-repository', healthy: false, message: msg };
    }
  }
}
