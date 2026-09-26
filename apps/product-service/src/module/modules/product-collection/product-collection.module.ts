import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductCollectionController } from '../../interfaces/controllers/rest/product-collection.controller';
import { ProductCollectionService } from '../../application/services/impl/product-collection.service';
import {
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler,
  AddProductToCollectionHandler,
} from '../../application/commands/collection';
import {
  ListCollectionsHandler,
  GetCollectionHandler,
} from '../../application/queries/collection';
import { ProductCollectionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-collection.prisma.repository';

const COMMAND_HANDLERS = [
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler,
  AddProductToCollectionHandler,
];

const QUERY_HANDLERS = [ListCollectionsHandler, GetCollectionHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductCollectionController],
  providers: [
    ProductCollectionPrismaRepository,
    ProductCollectionService,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
  exports: [ProductCollectionService, ProductCollectionPrismaRepository],
})
export class ProductCollectionModule {}
