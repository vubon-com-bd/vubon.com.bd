import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const BROADCAST_QUEUE = 'broadcast';

export interface ProcessBroadcastJobPayload {
  readonly broadcastId: string;
}

@Injectable()
export class BroadcastQueue {
  readonly queueName = BROADCAST_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: ProcessBroadcastJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process', payload);
  }
}
