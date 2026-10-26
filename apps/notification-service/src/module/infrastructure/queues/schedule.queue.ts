/**
 * ScheduleQueue — recurring schedule trigger queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface TriggerScheduleJobPayload {
  readonly scheduleId: string;
  readonly scheduledFor: string;
}

export interface ComputeNextRunJobPayload {
  readonly scheduleId: string;
  readonly lastRunAt: string;
}

@Injectable()
export class ScheduleQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueTrigger(
    payload: TriggerScheduleJobPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SCHEDULE,
      NOTIFICATION_JOB_NAME.TRIGGER_SCHEDULE,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `schedule:trigger:${payload.scheduleId}:${payload.scheduledFor}`,
      },
    );
  }

  async enqueueComputeNextRun(payload: ComputeNextRunJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SCHEDULE,
      NOTIFICATION_JOB_NAME.COMPUTE_NEXT_RUN,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.LOW,
        jobId: `schedule:next:${payload.scheduleId}`,
      },
    );
  }
}
