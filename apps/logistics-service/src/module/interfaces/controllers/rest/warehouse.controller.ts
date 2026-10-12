/**
 * WarehouseController
 * @module logistics-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateWarehouseCommand } from '../../../application/commands/warehouse/create-warehouse.command.js';
import { UpdateWarehouseCommand } from '../../../application/commands/warehouse/update-warehouse.command.js';
import { ActivateWarehouseCommand } from '../../../application/commands/warehouse/activate-warehouse.command.js';
import { DeactivateWarehouseCommand } from '../../../application/commands/warehouse/deactivate-warehouse.command.js';

import { GetWarehouseQuery } from '../../../application/queries/warehouse/get-warehouse.query.js';
import { ListWarehousesQuery } from '../../../application/queries/warehouse/list-warehouses.query.js';

import {
  CreateWarehouseHttpDTO, UpdateWarehouseHttpDTO, DeactivateWarehouseHttpDTO,
  MaintenanceWarehouseHttpDTO, ListWarehousesHttpQueryDTO,
} from '../../dtos/requests/warehouse.request.dto.js';
import { WarehouseControllerMapper } from '../../mappers/warehouse.controller.mapper.js';
import type {
  WarehouseResponseDTO, WarehouseListResponseDTO,
} from '../../../application/dtos/responses/warehouse/warehouse-response.dto.js';

@ApiTags('warehouses')
@ApiBearerAuth('bearer')
@Controller('logistics/warehouses')
@UseGuards(JwtAuthGuard)
export class WarehouseController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a warehouse' })
  async create(@Body() dto: CreateWarehouseHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<WarehouseResponseDTO> {
    return this.commandBus.execute(new CreateWarehouseCommand(WarehouseControllerMapper.toCreateDto(dto), user.userId));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update warehouse' })
  async update(@Param('id') id: string, @Body() dto: UpdateWarehouseHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<WarehouseResponseDTO> {
    return this.commandBus.execute(new UpdateWarehouseCommand(WarehouseControllerMapper.toUpdateDto(id, dto), user.userId));
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate warehouse' })
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<WarehouseResponseDTO> {
    return this.commandBus.execute(new ActivateWarehouseCommand(WarehouseControllerMapper.toActivateDto(id), user.userId));
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate warehouse' })
  async deactivate(@Param('id') id: string, @Body() dto: DeactivateWarehouseHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<WarehouseResponseDTO> {
    return this.commandBus.execute(new DeactivateWarehouseCommand(WarehouseControllerMapper.toDeactivateDto(id, dto), user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List warehouses' })
  async list(@Query() q: ListWarehousesHttpQueryDTO): Promise<WarehouseListResponseDTO> {
    return this.queryBus.execute(new ListWarehousesQuery(WarehouseControllerMapper.toListOptions(q)));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warehouse by id' })
  async getById(@Param('id') id: string): Promise<WarehouseResponseDTO> {
    return this.queryBus.execute(new GetWarehouseQuery(id));
  }
}
