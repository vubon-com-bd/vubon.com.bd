import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { SCHEDULE_QUEUE, type TriggerScheduleJobPayload } from '../queues/schedule.queue';
import type { ScheduleRepository } from '../../domain/repositories/schedule.repository.interface';
import { ScheduleIdVO } from '../../domain/value-objects/primitives/schedule-id.vo';

@Injectable()
export class ScheduleTriggerWorker implements OnModuleInit {
  private readonly logger = new Logger(ScheduleTriggerWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly scheduleRepo: ScheduleRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<TriggerScheduleJobPayload>(
      SCHEDULE_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: TriggerScheduleJobPayload): Promise<void> {
    try {
      const entity = await this.scheduleRepo.findById(
        ScheduleIdVO.create(payload.scheduleId),
      );
      if (!entity) {
        this.logger.warn(`Schedule not found: ${payload.scheduleId}`);
        return;
      }
      this.logger.log(`Triggering schedule ${entity.id.value}`);
      // TODO: execute schedule payload via command bus
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Schedule trigger error: ${message}`);
      throw error;
    }
  }
}
