import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const SCHEDULE_QUEUE = 'schedule';

export interface TriggerScheduleJobPayload {
  readonly scheduleId: string;
}

@Injectable()
export class ScheduleQueue {
  readonly queueName = SCHEDULE_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: TriggerScheduleJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'trigger', payload);
  }
}
