/**
 * ScheduleQueue — enqueue helpers for scheduled notification jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_LIMITS,
} from './queue.constants.js';

export interface TriggerSchedulePayload {
  readonly scheduleId: string;
  readonly occurrence: number;
  readonly triggeredAt: string;
}

export interface AdvanceRecurringPayload {
  readonly scheduleId: string;
  readonly nextOccurrenceAt: string;
}

@Injectable()
export class ScheduleQueue {
  private readonly logger = new Logger(ScheduleQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueTrigger(
    payload: TriggerSchedulePayload,
    scheduledAt?: Date,
  ): Promise<string> {
    const delayMs = scheduledAt
      ? Math.max(0, scheduledAt.getTime() - Date.now())
      : undefined;
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.TRIGGER_SCHEDULE,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `sched:${payload.scheduleId}:${payload.occurrence}`,
      },
    );
    this.logger.debug(`enqueueTrigger schedule=${payload.scheduleId}`);
    return jobId;
  }

  async enqueueAdvanceRecurring(payload: AdvanceRecurringPayload): Promise<string> {
    const delayMs = Math.max(
      0,
      new Date(payload.nextOccurrenceAt).getTime() - Date.now(),
    );
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.ADVANCE_RECURRING,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `sched:recur:${payload.scheduleId}:${payload.nextOccurrenceAt}`,
      },
    );
  }

  /** Periodic scanner — scheduled by a cron-style worker. */
  async enqueueScanDue(delayMs: number = NOTIFICATION_QUEUE_LIMITS.SCHEDULE_SCAN_INTERVAL_MS): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.SCAN_DUE_SCHEDULES,
      {},
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `sched:scan:${Date.now()}`,
      },
    );
  }
}
