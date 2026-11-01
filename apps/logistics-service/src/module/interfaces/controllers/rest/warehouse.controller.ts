/**
 * WarehouseController — REST endpoints
 * @module logistics-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateWarehouseCommand } from '@application/commands/warehouse/create-warehouse.command.js';
import { UpdateWarehouseCommand } from '@application/commands/warehouse/update-warehouse.command.js';
import { UpdateCapacityCommand } from '@application/commands/warehouse/update-capacity.command.js';
import { ActivateWarehouseCommand } from '@application/commands/warehouse/activate-warehouse.command.js';
import { DeactivateWarehouseCommand } from '@application/commands/warehouse/deactivate-warehouse.command.js';
import { CloseWarehouseCommand } from '@application/commands/warehouse/close-warehouse.command.js';
import { ArchiveWarehouseCommand } from '@application/commands/warehouse/archive-warehouse.command.js';
import { StartMaintenanceCommand } from '@application/commands/warehouse/start-maintenance.command.js';
import { EndMaintenanceCommand } from '@application/commands/warehouse/end-maintenance.command.js';

import { GetWarehouseQuery } from '@application/queries/warehouse/get-warehouse.query.js';
import { GetWarehouseByCodeQuery } from '@application/queries/warehouse/get-warehouse-by-code.query.js';
import { GetWarehouseStatsQuery } from '@application/queries/warehouse/get-warehouse-stats.query.js';
import { ListWarehousesQuery } from '@application/queries/warehouse/list-warehouses.query.js';
import { GetDefaultWarehouseQuery } from '@application/queries/warehouse/get-default-warehouse.query.js';

import {
  CreateWarehouseHttpDTO,
  UpdateWarehouseHttpDTO,
  UpdateCapacityHttpDTO,
  WarehouseReasonHttpDTO,
  ListWarehousesHttpQueryDTO,
} from '../../dtos/requests/warehouse/warehouse.request.dto.js';
import type {
  WarehouseHttpResponseDTO,
  WarehouseListHttpResponseDTO,
  WarehouseStatsHttpResponseDTO,
  WarehouseInitiateHttpResponseDTO,
} from '../../dtos/responses/warehouse/warehouse.response.dto.js';

import { WarehouseControllerMapper } from '../../mappers/warehouse.controller.mapper.js';
import { WarehouseHttpValidator } from '../../validators/warehouse.validator.js';
import { WarehouseLoggingInterceptor } from '../../interceptors/warehouse-logging.interceptor.js';
import { WarehouseTimeoutInterceptor } from '../../interceptors/warehouse-timeout.interceptor.js';
import {
  ApiCreateWarehouse,
  ApiGetWarehouse,
  ApiListWarehouses,
  ApiGetWarehouseStats,
  ApiWarehouseTransition,
  ApiWarehouseTag,
} from '../../swagger/warehouse.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiWarehouseTag()
@ApiBearerAuth('bearer')
@Controller('warehouses')
@UseGuards(JwtAuthGuard)
@UseInterceptors(WarehouseLoggingInterceptor, WarehouseTimeoutInterceptor)
export class WarehouseController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  // ═══ Create ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateWarehouse()
  async create(
    @Body() body: CreateWarehouseHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseInitiateHttpResponseDTO> {
    WarehouseHttpValidator.validateCreate(body);
    const appDto = WarehouseControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateWarehouseCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateWarehouseCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      warehouseId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @ApiWarehouseTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateWarehouseHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    WarehouseHttpValidator.validateUpdate({ warehouseId: id, ...body });
    const appDto = WarehouseControllerMapper.toUpdateAppDto(id, body);
    const result = await this.commandBus.execute<
      UpdateWarehouseCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new UpdateWarehouseCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Patch(':id/capacity')
  @ApiWarehouseTransition('capacity')
  async updateCapacity(
    @Param('id') id: string,
    @Body() body: UpdateCapacityHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    WarehouseHttpValidator.validateCapacity({ warehouseId: id, ...body });
    const appDto = WarehouseControllerMapper.toCapacityAppDto(id, body);
    const result = await this.commandBus.execute<
      UpdateCapacityCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new UpdateCapacityCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  // ═══ State transitions ═══
  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('activate')
  async activate(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ActivateWarehouseCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new ActivateWarehouseCommand({ warehouseId: id } as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: WarehouseReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const appDto = WarehouseControllerMapper.toReasonAppDto(id, body);
    const result = await this.commandBus.execute<
      DeactivateWarehouseCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new DeactivateWarehouseCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Post(':id/close')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('close')
  async close(
    @Param('id') id: string,
    @Body() body: WarehouseReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const appDto = WarehouseControllerMapper.toReasonAppDto(id, body);
    const result = await this.commandBus.execute<
      CloseWarehouseCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new CloseWarehouseCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('archive')
  async archive(
    @Param('id') id: string,
    @Body() body: WarehouseReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const appDto = WarehouseControllerMapper.toReasonAppDto(id, body);
    const result = await this.commandBus.execute<
      ArchiveWarehouseCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new ArchiveWarehouseCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Post(':id/maintenance/start')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('start-maintenance')
  async startMaintenance(
    @Param('id') id: string,
    @Body() body: WarehouseReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const appDto = WarehouseControllerMapper.toReasonAppDto(id, body);
    const result = await this.commandBus.execute<
      StartMaintenanceCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new StartMaintenanceCommand(appDto as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  @Post(':id/maintenance/end')
  @HttpCode(HttpStatus.OK)
  @ApiWarehouseTransition('end-maintenance')
  async endMaintenance(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<WarehouseHttpResponseDTO> {
    const result = await this.commandBus.execute<
      EndMaintenanceCommand,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new EndMaintenanceCommand({ warehouseId: id } as never, this.getActorId(user)));
    return WarehouseControllerMapper.toHttpResponse(result);
  }

  // ═══ Read ═══
  @Get('default')
  @ApiGetWarehouse()
  async getDefault(): Promise<WarehouseHttpResponseDTO | null> {
    const appDto = await this.queryBus.execute<
      GetDefaultWarehouseQuery,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0] | null
    >(new GetDefaultWarehouseQuery());
    return appDto ? WarehouseControllerMapper.toHttpResponse(appDto) : null;
  }

  @Get('stats')
  @ApiGetWarehouseStats()
  async getStats(): Promise<WarehouseStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetWarehouseStatsQuery,
      Parameters<typeof WarehouseControllerMapper.toStatsHttp>[0]
    >(new GetWarehouseStatsQuery());
    return WarehouseControllerMapper.toStatsHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetWarehouse()
  async getByCode(@Param('code') code: string): Promise<WarehouseHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetWarehouseByCodeQuery,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new GetWarehouseByCodeQuery(code));
    return WarehouseControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetWarehouse()
  async getById(@Param('id') id: string): Promise<WarehouseHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetWarehouseQuery,
      Parameters<typeof WarehouseControllerMapper.toHttpResponse>[0]
    >(new GetWarehouseQuery(id));
    return WarehouseControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListWarehouses()
  async list(@Query() query: ListWarehousesHttpQueryDTO): Promise<WarehouseListHttpResponseDTO> {
    const options = WarehouseControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<
      ListWarehousesQuery,
      Parameters<typeof WarehouseControllerMapper.toListHttp>[0]
    >(new ListWarehousesQuery(options as never));
    return WarehouseControllerMapper.toListHttp(appDto);
  }
}
