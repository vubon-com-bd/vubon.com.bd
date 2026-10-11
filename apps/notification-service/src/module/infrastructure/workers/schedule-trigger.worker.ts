/**
 * ScheduleTriggerWorker — triggers due schedules + scans for upcoming
 * @module notification-service/infrastructure/workers
 *
 * Jobs: trigger-schedule, advance-recurring, scan-due-schedules
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { ScheduleQueue } from '../queues/schedule.queue.js';
import type { TriggerSchedulePayload, AdvanceRecurringPayload } from '../queues/schedule.queue.js';
import {
  SCHEDULE_REPOSITORY,
  type ScheduleRepository,
} from '../../domain/repositories/schedule.repository.interface.js';
import { ScheduleIdVO } from '../../domain/value-objects/primitives/schedule-id.vo.js';

@Injectable()
export class ScheduleTriggerWorker extends BaseWorker<
  TriggerSchedulePayload | AdvanceRecurringPayload | Record<string, never>
> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.TRIGGER_SCHEDULE,
    NOTIFICATION_JOB_NAME.ADVANCE_RECURRING,
    NOTIFICATION_JOB_NAME.SCAN_DUE_SCHEDULES,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(SCHEDULE_REPOSITORY) private readonly scheduleRepo: ScheduleRepository,
    private readonly scheduleQueue: ScheduleQueue,
  ) {
    super(queueService, 'ScheduleTriggerWorker');
  }

  protected async handle(
    payload: TriggerSchedulePayload | AdvanceRecurringPayload | Record<string, never>,
  ): Promise<unknown> {
    const anyPayload = payload as Record<string, unknown>;
    // Scan mode (no payload keys)
    if (Object.keys(anyPayload).length === 0) {
      const due = await this.scheduleRepo.findDue();
      this.logger.log(`Scan found ${due.length} due schedules`);
      for (const schedule of due) {
        await this.scheduleQueue.enqueueTrigger({
          scheduleId: schedule.id,
          occurrence: schedule.occurrenceCount + 1,
          triggeredAt: new Date().toISOString(),
        });
      }
      return { scanned: due.length };
    }

    const scheduleId = String(anyPayload['scheduleId']);
    const vo = ScheduleIdVO.create(scheduleId);
    const schedule = await this.scheduleRepo.findByIdVO(vo);
    if (!schedule) return { skipped: true, reason: 'not_found' };

    try {
      schedule.trigger();
      await this.scheduleRepo.save(schedule);
      this.logger.log(
        `Triggered schedule ${scheduleId} — occurrence ${schedule.occurrenceCount}`,
      );
      // If more occurrences remain, schedule next advance
      if (schedule.nextOccurrenceAt) {
        await this.scheduleQueue.enqueueAdvanceRecurring({
          scheduleId,
          nextOccurrenceAt: schedule.nextOccurrenceAt,
        });
      }
      return { triggered: true, occurrence: schedule.occurrenceCount };
    } catch (err) {
      this.logger.error(`Trigger failed for ${scheduleId}: ${(err as Error).message}`);
      throw err;
    }
  }
}
