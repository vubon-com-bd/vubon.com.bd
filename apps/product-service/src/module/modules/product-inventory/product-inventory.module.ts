import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductInventoryController } from '../../interfaces/controllers/rest/product-inventory.controller';
import { ProductInventoryService } from '../../application/services/impl/product-inventory.service';
import { InventoryMapper } from '../../application/mappers/inventory.mapper';
import {
  UpdateInventoryHandler,
  AdjustInventoryHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
} from '../../application/commands/inventory';
import {
  GetInventoryHandler,
  CheckStockHandler,
} from '../../application/queries/inventory';
import { InventoryAlertSaga } from '../../application/sagas';
import { ProductInventoryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-inventory.prisma.repository';
import { InventoryTrackerService } from '../../infrastructure/services/internal/inventory-tracker.service';

const COMMAND_HANDLERS = [
  UpdateInventoryHandler,
  AdjustInventoryHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
];

const QUERY_HANDLERS = [GetInventoryHandler, CheckStockHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductInventoryController],
  providers: [
    ProductInventoryPrismaRepository,
    InventoryTrackerService,
    ProductInventoryService,
    InventoryMapper,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    InventoryAlertSaga,
  ],
  exports: [ProductInventoryService, ProductInventoryPrismaRepository],
})
export class ProductInventoryModule {}
