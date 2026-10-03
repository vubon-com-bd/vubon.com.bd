/**
 * SearchQueueService
 * @module product-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { SEARCH_QUEUE, JOB_TYPES } from './queue.constants.js';

export const SEARCH_QUEUE_SERVICE = Symbol('SEARCH_QUEUE_SERVICE');

@Injectable()
export class SearchQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async scheduleBulkReindex(entity: 'product' | 'category' | 'brand' | 'all'): Promise<void> {
    await this.factory.enqueue(SEARCH_QUEUE, JOB_TYPES.SEARCH_BULK_REINDEX, { entity });
  }

  async scheduleClearCache(scope?: string): Promise<void> {
    await this.factory.enqueue(SEARCH_QUEUE, JOB_TYPES.SEARCH_CLEAR_CACHE, { scope });
  }
}
