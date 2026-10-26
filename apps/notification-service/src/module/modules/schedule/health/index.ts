/**
 * Schedule Health Indicator
 * @module notification-service/modules/schedule/health
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  SCHEDULE_REPOSITORY,
  type ScheduleRepository,
} from '@domain/repositories/schedule.repository.interface.js';
import { Inject } from '@nestjs/common';

export interface ScheduleHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class ScheduleHealthIndicator {
  private readonly logger = new Logger(ScheduleHealthIndicator.name);

  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly repo: ScheduleRepository,
  ) {}

  async check(): Promise<ScheduleHealthReport> {
    try {
      const active = await this.repo.countActive();
      return {
        name: 'schedule-repository',
        healthy: true,
        message: `${active} active schedules`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Schedule health failed: ${msg}`);
      return { name: 'schedule-repository', healthy: false, message: msg };
    }
  }
}
