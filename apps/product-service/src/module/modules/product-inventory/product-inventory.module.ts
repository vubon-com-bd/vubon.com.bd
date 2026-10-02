/**
 * ProductInventoryModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { CacheModule } from '../../infrastructure/persistence/cache/cache.module.js';
import { ProductInventoryController } from '../../interfaces/controllers/rest/product-inventory.controller.js';
import { InventoryService } from '../../application/services/impl/inventory.service.js';
import { INVENTORY_SERVICE } from '../../application/services/interfaces/inventory.service.interface.js';
import { INVENTORY_COMMAND_HANDLERS } from '../../application/commands/inventory/index.js';
import { INVENTORY_QUERY_HANDLERS } from '../../application/queries/inventory/index.js';
import { StockAlertSaga } from '../../application/sagas/stock-alert.saga.js';

@Module({
  imports: [PrismaRepositoriesModule, CacheModule],
  controllers: [ProductInventoryController],
  providers: [
    InventoryService,
    { provide: INVENTORY_SERVICE, useExisting: InventoryService },
    ...INVENTORY_COMMAND_HANDLERS,
    ...INVENTORY_QUERY_HANDLERS,
    StockAlertSaga],
  exports: [InventoryService, INVENTORY_SERVICE],
})
export class ProductInventoryModule {}
