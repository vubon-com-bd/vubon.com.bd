import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface ProcessDispatchPayload {
  readonly dispatchId: string;
  readonly action: string;
}

@Injectable()
export class DispatchQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessDispatchPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.DISPATCH_PROCESSING,
      LOGISTICS_JOB_NAME.PROCESS_DISPATCH,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process:${payload.dispatchId}:${payload.action}`,
      },
    );
  }
}
