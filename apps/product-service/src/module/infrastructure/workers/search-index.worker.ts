/**
 * SearchIndexWorker
 * @module product-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { IndexProductPayload } from '../queues/search-index.queue.js';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '../../domain/repositories/product.repository.interface.js';
import { ProductIdVO } from '../../domain/value-objects/primitives/product-id.vo.js';
import { ProductIndexer } from '../persistence/search/indexers/product.indexer.js';

@Injectable()
export class SearchIndexWorker extends BaseWorker<IndexProductPayload> {
  protected readonly queueName = PRODUCT_QUEUE_NAME.SEARCH_INDEX;
  protected readonly jobNames = [
    PRODUCT_JOB_NAME.INDEX_PRODUCT,
    PRODUCT_JOB_NAME.REINDEX_PRODUCT,
    PRODUCT_JOB_NAME.REMOVE_FROM_INDEX,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    private readonly indexer: ProductIndexer,
  ) {
    super(queueService, 'SearchIndexWorker');
  }

  protected async handle(payload: IndexProductPayload): Promise<unknown> {
    const vo = ProductIdVO.create(payload.productId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      await this.indexer.remove(payload.productId);
      return { removed: true, reason: 'not_found' };
    }

    await this.indexer.reindex(entity);
    this.logger.log(`Indexed product ${payload.productId}`);
    return { indexed: true, productId: payload.productId };
  }

  protected concurrency(): number {
    return 10;
  }
}
