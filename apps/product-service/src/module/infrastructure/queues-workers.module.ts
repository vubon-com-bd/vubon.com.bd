/**
 * QueuesWorkersModule — BullMQ queues + workers.
 * @module product-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from './persistence/prisma/repositories.module.js';
import { SearchModule } from './persistence/search/search.module.js';
import { CacheModule } from './persistence/cache/cache.module.js';

import { QueueFactory } from './queues/queue.factory.js';
import { ProductQueueService, PRODUCT_QUEUE_SERVICE } from './queues/product-queue.service.js';
import { InventoryQueueService, INVENTORY_QUEUE_SERVICE } from './queues/inventory-queue.service.js';
import { SearchQueueService, SEARCH_QUEUE_SERVICE } from './queues/search-queue.service.js';

import { ProductIndexWorker } from './workers/product-index.worker.js';
import { InventoryAlertWorker } from './workers/inventory-alert.worker.js';
import { SearchReindexWorker } from './workers/search-reindex.worker.js';
import { MediaProcessingWorker } from './workers/media-processing.worker.js';
import { ReviewModerationWorker } from './workers/review-moderation.worker.js';
import { NotificationWorker } from './workers/notification.worker.js';

import { NotificationService } from './services/external/notification.service.js';

@Module({
  imports: [PrismaRepositoriesModule, SearchModule, CacheModule],
  providers: [
    // Queues
    QueueFactory,
    ProductQueueService,
    InventoryQueueService,
    SearchQueueService,
    { provide: PRODUCT_QUEUE_SERVICE, useExisting: ProductQueueService },
    { provide: INVENTORY_QUEUE_SERVICE, useExisting: InventoryQueueService },
    { provide: SEARCH_QUEUE_SERVICE, useExisting: SearchQueueService },

    // Notification helper
    NotificationService,

    // Workers
    ProductIndexWorker,
    InventoryAlertWorker,
    SearchReindexWorker,
    MediaProcessingWorker,
    ReviewModerationWorker,
    NotificationWorker,
  ],
  exports: [
    QueueFactory,
    ProductQueueService,
    InventoryQueueService,
    SearchQueueService,
    PRODUCT_QUEUE_SERVICE,
    INVENTORY_QUEUE_SERVICE,
    SEARCH_QUEUE_SERVICE,
  ],
})
export class QueuesWorkersModule {}
