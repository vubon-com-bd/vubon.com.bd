import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface DispatchJobPayload {
  readonly dispatchId: string;
  readonly action: string;
}

@Injectable()
export class DispatchQueue {
  readonly queueName = QUEUE_NAME.DISPATCH;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: DispatchJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'dispatch-job', payload, {
      priority: QUEUE_PRIORITY.HIGH,
      delayMs,
    });
  }
}
