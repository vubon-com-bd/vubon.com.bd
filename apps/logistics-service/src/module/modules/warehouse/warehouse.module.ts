/**
 * WarehouseModule — feature wiring for Warehouse aggregate
 * @module logistics-service/modules/warehouse
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { WarehouseController } from '../../interfaces/controllers/rest/warehouse.controller.js';
import { WarehouseService } from '../../application/services/impl/warehouse.service.js';
import { WAREHOUSE_SERVICE } from '../../application/services/interfaces/warehouse.service.interface.js';
import { WAREHOUSE_COMMAND_HANDLERS } from '../../application/commands/warehouse/index.js';
import { WAREHOUSE_QUERY_HANDLERS } from '../../application/queries/warehouse/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    { provide: WAREHOUSE_SERVICE, useExisting: WarehouseService },
    ...WAREHOUSE_COMMAND_HANDLERS,
    ...WAREHOUSE_QUERY_HANDLERS,
  ],
  exports: [WarehouseService, WAREHOUSE_SERVICE],
})
export class WarehouseModule {}
