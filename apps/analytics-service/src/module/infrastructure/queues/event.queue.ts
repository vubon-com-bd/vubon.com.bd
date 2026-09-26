import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface ProcessEventJobPayload {
  readonly eventId: string;
  readonly name: string;
  readonly source: string;
}

export interface BatchProcessJobPayload {
  readonly eventIds: readonly string[];
}

@Injectable()
export class EventQueue {
  readonly queueName = 'analytics:event';

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessEventJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-event', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueBatch(payload: BatchProcessJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-batch', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
