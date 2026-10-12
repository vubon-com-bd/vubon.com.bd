/**
 * Event Health Barrel
 * @module analytics-service/modules/event/health
 *
 * Event-specific health indicator — verifies event repository reachability.
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventPrismaRepository } from '../../../infrastructure/persistence/prisma/repositories/event.prisma.repository.js';

export interface EventHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class EventHealthIndicator {
  private readonly logger = new Logger(EventHealthIndicator.name);

  constructor(private readonly eventRepo: EventPrismaRepository) {}

  async check(): Promise<EventHealthReport> {
    try {
      const count = await this.eventRepo.countByFilters({});
      return {
        name: 'event-repository',
        healthy: true,
        message: `${count} events indexed`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Event health check failed: ${msg}`);
      return {
        name: 'event-repository',
        healthy: false,
        message: msg,
      };
    }
  }
}
