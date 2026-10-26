/**
 * Broadcast Health Indicator
 * @module notification-service/modules/broadcast/health
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BROADCAST_REPOSITORY,
  type BroadcastRepository,
} from '@domain/repositories/broadcast.repository.interface.js';

export interface BroadcastHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class BroadcastHealthIndicator {
  private readonly logger = new Logger(BroadcastHealthIndicator.name);

  constructor(
    @Inject(BROADCAST_REPOSITORY)
    private readonly repo: BroadcastRepository,
  ) {}

  async check(): Promise<BroadcastHealthReport> {
    try {
      const inProgress = await this.repo.countInProgress();
      return {
        name: 'broadcast-repository',
        healthy: true,
        message: `${inProgress} in progress`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Broadcast health failed: ${msg}`);
      return { name: 'broadcast-repository', healthy: false, message: msg };
    }
  }
}
