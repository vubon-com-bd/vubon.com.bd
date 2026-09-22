import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class SearchIndexQueue {
  readonly queueName = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queueService: QueueService) {}

  async enqueueReindex(entityType: string, entityId: string): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'reindex', { entityType, entityId }, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
