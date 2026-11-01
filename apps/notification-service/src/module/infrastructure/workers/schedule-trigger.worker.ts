/**
 * ScheduleTriggerWorker — schedule execution worker
 * @module notification-service/infrastructure/workers
 *
 * Flow:
 *  1. Load schedule entity
 *  2. Check if due
 *  3. Trigger send (via NotificationSender queue)
 *  4. Record execution
 *  5. Compute next run
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  SCHEDULE_REPOSITORY,
  type ScheduleRepository,
} from '@domain/repositories/schedule.repository.interface.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleMatcherService } from '@domain/services/schedule-matcher.service.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface ScheduleTriggerPayload {
  readonly scheduleId: string;
  readonly scheduledFor: string;
}

@Injectable()
export class ScheduleTriggerWorker extends BaseWorker<ScheduleTriggerPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.SCHEDULE;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.TRIGGER_SCHEDULE] as const;

  constructor(
    queueService: QueueService,
    @Inject(SCHEDULE_REPOSITORY)
    private readonly repo: ScheduleRepository,
  ) {
    super(queueService, 'ScheduleTriggerWorker');
  }

  protected async handle(payload: ScheduleTriggerPayload): Promise<unknown> {
    const vo = ScheduleIdVO.reconstitute(payload.scheduleId);
    const schedule = await this.repo.findByIdVO(vo);
    if (!schedule) {
      this.logger.warn(`Schedule ${payload.scheduleId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    if (!schedule.isRunnable()) {
      return { skipped: true, reason: `not-runnable:${schedule.status.value}` };
    }

    const match = ScheduleMatcherService.match({
      schedule,
      now: payload.scheduledFor,
    });

    if (!match.shouldRun) {
      this.logger.debug(
        `Schedule ${payload.scheduleId} not due — ${match.reason}`,
      );
      return { skipped: true, reason: match.reason };
    }

    this.logger.log(
      `⏰ Schedule trigger → schedule=${payload.scheduleId} run=${schedule.runCount + 1}`,
    );

    schedule.recordExecution(schedule.vo.recipientCount(), payload.scheduledFor);
    await this.repo.save(schedule);

    return { processed: true, scheduleId: payload.scheduleId };
  }
}
