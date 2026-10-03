/**
 * ProductIndexWorker — reindexes products to search.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { PRODUCT_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { ProductIndexer } from '../persistence/search/indexers/product.indexer.js';

interface ProductIndexPayload {
  productId?: string;
}

@Injectable()
export class ProductIndexWorker extends BaseWorker {
  constructor(private readonly indexer: ProductIndexer) {
    super(PRODUCT_QUEUE, ProductIndexWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as ProductIndexPayload;
    switch (job.name as string) {
      case JOB_TYPES.PRODUCT_INDEX_ONE:
        if (data.productId) await this.indexer.indexProduct(data.productId);
        return;
      case JOB_TYPES.PRODUCT_REMOVE_INDEX:
        if (data.productId) await this.indexer.removeProduct(data.productId);
        return;
      case JOB_TYPES.PRODUCT_REINDEX:
        await this.indexer.reindexAll();
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}
