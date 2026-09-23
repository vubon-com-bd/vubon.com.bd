import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { ListLocationsQuery } from '../../../application/queries/warehouse/list-locations.query';

@Controller('logistics/inventory-locations')
@UseGuards(JwtAuthGuard)
export class InventoryLocationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('warehouse/:warehouseId')
  @Permissions(LOGISTICS_PERMISSION.WAREHOUSE_VIEW)
  async listByWarehouse(
    @Param('warehouseId') warehouseId: string,
    @Query('availableOnly') availableOnly?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListLocationsQuery(warehouseId, availableOnly === 'true'),
    );
  }
}
