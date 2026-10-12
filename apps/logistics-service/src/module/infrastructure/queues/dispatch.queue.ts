import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface DispatchJobPayload {
  readonly dispatchId: string;
  readonly action: 'process' | 'optimize-route';
}

@Injectable()
export class DispatchQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: DispatchJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.DISPATCH, `dispatch.${payload.action}`, payload);
  }
}
