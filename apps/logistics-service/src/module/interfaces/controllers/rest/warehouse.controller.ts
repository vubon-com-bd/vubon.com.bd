import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { CreateWarehouseCommand } from '../../../application/commands/warehouse/create-warehouse.command';
import { AddLocationCommand } from '../../../application/commands/warehouse/add-location.command';
import { GetWarehouseQuery } from '../../../application/queries/warehouse/get-warehouse.query';
import { ListWarehousesQuery } from '../../../application/queries/warehouse/list-warehouses.query';
import type { CreateWarehouseRequestDTO } from '../../dtos/requests/warehouse.request.dto';

@Controller('logistics/warehouses')
@UseGuards(JwtAuthGuard)
export class WarehouseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.WAREHOUSE_MANAGE)
  async create(@Body() body: CreateWarehouseRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateWarehouseCommand(
        body.code,
        body.name,
        body.type,
        body.division,
        body.district,
        body.address,
        body.capacity,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.WAREHOUSE_VIEW)
  async list(
    @Query('division') division?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListWarehousesQuery(division, activeOnly === 'true'),
    );
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.WAREHOUSE_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetWarehouseQuery(id));
  }

  @Post(':id/locations')
  @Permissions(LOGISTICS_PERMISSION.WAREHOUSE_MANAGE)
  async addLocation(
    @Param('id') warehouseId: string,
    @Body() body: { code: string; type: string; name?: string; capacity?: number },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddLocationCommand(warehouseId, body.code, body.type, body.name, body.capacity),
    );
  }
}
