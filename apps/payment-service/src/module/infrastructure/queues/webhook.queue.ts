import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface WebhookJobPayload {
  readonly gateway: string;
  readonly rawBody: string;
  readonly signature: string;
  readonly headers: Readonly<Record<string, string>>;
}

@Injectable()
export class WebhookQueue {
  readonly queueName = 'webhook';

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: WebhookJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-webhook', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueRetry(payload: WebhookJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'retry-webhook', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
