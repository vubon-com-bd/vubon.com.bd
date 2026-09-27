/**
 * UserSyncWorker — syncs user profile with external systems
 * @module user-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import {
  LoggerService,
} from '@vubon/shared-kernel/infrastructure';

export interface UserSyncJob {
  readonly id: string;
  readonly data: {
    readonly userId: string;
    readonly correlationId?: string;
  };
}

@Injectable()
export class UserSyncWorker {
  constructor(private readonly logger: LoggerService) {}

  async process(job: UserSyncJob): Promise<void> {
    const { userId, correlationId } = job.data;
    this.logger.log(`Processing user sync for ${userId}`, { userId, correlationId });

    try {
      // Business: sync to analytics/CRM — placeholder until infra adapters plugged in
      // Real implementation awaits external integrations.
      this.logger.log(`User sync completed for ${userId}`, { userId });
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`User sync failed for ${userId}: ${reason}`, undefined, {
        userId,
      });
      throw err;
    }
  }
}
