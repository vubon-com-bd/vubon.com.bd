/**
 * SearchIndexQueue — enqueue helpers for search indexing
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from './queue.constants.js';

export interface IndexProductPayload {
  readonly productId: string;
}

export interface ReindexProductPayload {
  readonly productId: string;
  readonly reason: string;
}

export interface RemoveFromIndexPayload {
  readonly productId: string;
}

@Injectable()
export class SearchIndexQueue {
  private readonly logger = new Logger(SearchIndexQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueIndex(payload: IndexProductPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.SEARCH_INDEX,
      PRODUCT_JOB_NAME.INDEX_PRODUCT,
      payload,
      { priority: QUEUE_PRIORITY.NORMAL, jobId: `index:${payload.productId}` },
    );
  }

  async enqueueReindex(payload: ReindexProductPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.SEARCH_INDEX,
      PRODUCT_JOB_NAME.REINDEX_PRODUCT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `reindex:${payload.productId}:${Date.now()}`,
      },
    );
  }

  async enqueueRemove(payload: RemoveFromIndexPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.SEARCH_INDEX,
      PRODUCT_JOB_NAME.REMOVE_FROM_INDEX,
      payload,
      { priority: QUEUE_PRIORITY.LOW, jobId: `remove-index:${payload.productId}` },
    );
  }
}
