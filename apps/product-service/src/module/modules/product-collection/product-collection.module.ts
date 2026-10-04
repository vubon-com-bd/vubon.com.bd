/**
 * ProductCollectionModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductCollectionController } from '../../interfaces/controllers/rest/product-collection.controller.js';
import { CollectionService } from '../../application/services/impl/collection.service.js';
import { COLLECTION_SERVICE } from '../../application/services/interfaces/collection.service.interface.js';
import { COLLECTION_COMMAND_HANDLERS } from '../../application/commands/collection/index.js';
import { COLLECTION_QUERY_HANDLERS } from '../../application/queries/collection/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductCollectionController],
  providers: [
    CollectionService,
    { provide: COLLECTION_SERVICE, useExisting: CollectionService },
    ...COLLECTION_COMMAND_HANDLERS,
    ...COLLECTION_QUERY_HANDLERS],
  exports: [CollectionService, COLLECTION_SERVICE],
})
export class ProductCollectionModule {}
