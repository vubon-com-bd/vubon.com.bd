/**
 * ProductCollectionModule — collection feature wiring
 * @module product-service/modules/product-collection
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductCollectionController } from '../../interfaces/controllers/rest/product-collection.controller.js';

import { COLLECTION_COMMAND_HANDLERS } from './commands/index.js';
import { COLLECTION_QUERY_HANDLERS } from './queries/index.js';

import { ProductCollectionService } from '../../application/services/impl/product-collection.service.js';
import { COLLECTION_SERVICE } from '../../application/services/interfaces/product-collection.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductCollectionController],
  providers: [
    ProductCollectionService,
    { provide: COLLECTION_SERVICE, useExisting: ProductCollectionService },
    ...(COLLECTION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(COLLECTION_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductCollectionService, COLLECTION_SERVICE],
})
export class ProductCollectionModule {}
