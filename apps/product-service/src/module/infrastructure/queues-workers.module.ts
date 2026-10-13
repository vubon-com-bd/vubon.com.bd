/**
 * Queues + Workers Module
 * @module product-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// Queues
import { ProductQueue } from './queues/product.queue.js';
import { InventoryQueue } from './queues/inventory.queue.js';
import { SearchIndexQueue } from './queues/search-index.queue.js';
import { MediaQueue } from './queues/media.queue.js';
import { AnalyticsQueue } from './queues/analytics.queue.js';

// Workers
import { ProductProcessorWorker } from './workers/product-processor.worker.js';
import { InventorySyncWorker } from './workers/inventory-sync.worker.js';
import { SearchIndexWorker } from './workers/search-index.worker.js';
import { MediaProcessorWorker } from './workers/media-processor.worker.js';
import { AnalyticsProcessorWorker } from './workers/analytics-processor.worker.js';

// Persistence module (for repository injection)
import { PersistenceModule } from './persistence/persistence.module.js';
import { SearchModule } from './persistence/search/search.module.js';

const QUEUES = [ProductQueue, InventoryQueue, SearchIndexQueue, MediaQueue, AnalyticsQueue];

const WORKERS = [
  ProductProcessorWorker,
  InventorySyncWorker,
  SearchIndexWorker,
  MediaProcessorWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [QueueModule, PersistenceModule.forRoot(), SearchModule],
  providers: [...QUEUES, ...WORKERS],
  exports: QUEUES,
})
export class QueuesWorkersModule {}
