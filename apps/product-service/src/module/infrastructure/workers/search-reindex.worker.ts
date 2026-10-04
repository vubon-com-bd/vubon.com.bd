/**
 * SearchReindexWorker — bulk reindex + cache clear for search.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { SEARCH_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { ProductIndexer } from '../persistence/search/indexers/product.indexer.js';
import { CategoryIndexer } from '../persistence/search/indexers/category.indexer.js';
import { BrandIndexer } from '../persistence/search/indexers/brand.indexer.js';
import { SearchResultCacheRepository } from '../persistence/cache/repositories/search-result.cache-repository.js';

interface ReindexPayload {
  entity?: 'product' | 'category' | 'brand' | 'all';
}

@Injectable()
export class SearchReindexWorker extends BaseWorker {
  constructor(
    private readonly productIndexer: ProductIndexer,
    private readonly categoryIndexer: CategoryIndexer,
    private readonly brandIndexer: BrandIndexer,
    private readonly searchCache: SearchResultCacheRepository,
  ) {
    super(SEARCH_QUEUE, SearchReindexWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as ReindexPayload;
    switch (job.name as string) {
      case JOB_TYPES.SEARCH_BULK_REINDEX: {
        const entity = data.entity ?? 'all';
        if (entity === 'product' || entity === 'all') await this.productIndexer.reindexAll();
        if (entity === 'category' || entity === 'all') await this.categoryIndexer.reindexAll();
        if (entity === 'brand' || entity === 'all') await this.brandIndexer.reindexAll();
        return;
      }
      case JOB_TYPES.SEARCH_CLEAR_CACHE:
        await this.searchCache.invalidateAll();
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}
