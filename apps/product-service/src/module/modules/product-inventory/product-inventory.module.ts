/**
 * ProductInventoryModule — inventory feature wiring
 * @module product-service/modules/product-inventory
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductInventoryController } from '../../interfaces/controllers/rest/product-inventory.controller.js';

import { INVENTORY_COMMAND_HANDLERS } from './commands/index.js';
import { INVENTORY_QUERY_HANDLERS } from './queries/index.js';
import { INVENTORY_SAGAS } from './sagas/index.js';

import { ProductInventoryApplicationService } from '../../application/services/impl/product-inventory.service.js';
import { INVENTORY_SERVICE } from '../../application/services/interfaces/product-inventory.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductInventoryController],
  providers: [
    ProductInventoryApplicationService,
    { provide: INVENTORY_SERVICE, useExisting: ProductInventoryApplicationService },
    ...(INVENTORY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(INVENTORY_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(INVENTORY_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [ProductInventoryApplicationService, INVENTORY_SERVICE],
})
export class ProductInventoryModule {}
