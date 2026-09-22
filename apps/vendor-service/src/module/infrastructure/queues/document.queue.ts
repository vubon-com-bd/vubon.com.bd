import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'document';

@Injectable()
export class DocumentQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiryCheck(payload: Record<string, never> = {}): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'document-expiry', payload);
  }
}
