import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductVariantController } from '../../interfaces/controllers/rest/product-variant.controller';
import { ProductVariantService } from '../../application/services/impl/product-variant.service';
import { VariantMapper } from '../../application/mappers/variant.mapper';
import {
  AddVariantHandler,
  UpdateVariantHandler,
  RemoveVariantHandler,
  SetDefaultVariantHandler,
} from '../../application/commands/variant';
import {
  ListVariantsHandler,
  GetVariantHandler,
} from '../../application/queries/variant';
import { ProductVariantPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-variant.prisma.repository';
import { ProductVariantCacheRepository } from '../../infrastructure/persistence/cache/repositories/product-variant.cache.repository';

const COMMAND_HANDLERS = [
  AddVariantHandler,
  UpdateVariantHandler,
  RemoveVariantHandler,
  SetDefaultVariantHandler,
];

const QUERY_HANDLERS = [ListVariantsHandler, GetVariantHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductVariantController],
  providers: [
    ProductVariantPrismaRepository,
    ProductVariantCacheRepository,
    ProductVariantService,
    VariantMapper,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
  exports: [ProductVariantService, ProductVariantPrismaRepository],
})
export class ProductVariantModule {}
