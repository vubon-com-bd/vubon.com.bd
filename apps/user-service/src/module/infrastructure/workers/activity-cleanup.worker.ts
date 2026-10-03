/**
 * ActivityCleanupWorker — purges old activities beyond retention
 */
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@vubon/shared-kernel/infrastructure';
import { ActivityRecorderService } from '../services/internal/activity-recorder.service.js';
import { ACTIVITY_CONFIG } from '../config/activity.config.js';

export interface ActivityCleanupJob {
  readonly id: string;
  readonly data: { readonly requestedAt: string };
}

@Injectable()
export class ActivityCleanupWorker {
  constructor(
    private readonly recorder: ActivityRecorderService,
    private readonly logger: LoggerService
  ) {}

  async process(_job: ActivityCleanupJob): Promise<void> {
    const days = ACTIVITY_CONFIG.retentionDays;
    this.logger.log(`Cleaning up activities older than ${days} days`);

    const deleted = await this.recorder.cleanupOlderThan(days);
    this.logger.log(`Deleted ${deleted} activities`);
  }
}
