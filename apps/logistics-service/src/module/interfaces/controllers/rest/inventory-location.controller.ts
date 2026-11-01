/**
 * InventoryLocationController — REST endpoints
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

import { CreateInventoryLocationCommand } from '@application/commands/inventory-location/create-inventory-location.command.js';
import { UpdateInventoryLocationCommand } from '@application/commands/inventory-location/update.command.js';
import { ActivateInventoryLocationCommand } from '@application/commands/inventory-location/activate.command.js';
import { DeactivateInventoryLocationCommand } from '@application/commands/inventory-location/deactivate.command.js';
import { QuarantineInventoryLocationCommand } from '@application/commands/inventory-location/quarantine.command.js';
import { UnquarantineInventoryLocationCommand } from '@application/commands/inventory-location/unquarantine.command.js';
import { ArchiveInventoryLocationCommand } from '@application/commands/inventory-location/archive.command.js';
import { AddStockInventoryLocationCommand } from '@application/commands/inventory-location/add-stock.command.js';
import { RemoveStockInventoryLocationCommand } from '@application/commands/inventory-location/remove-stock.command.js';

import { GetInventoryLocationQuery } from '@application/queries/inventory-location/get-inventory-location.query.js';
import { GetInventoryLocationByCodeQuery } from '@application/queries/inventory-location/get-inventory-location-by-code.query.js';
import { GetInventoryLocationByBarcodeQuery } from '@application/queries/inventory-location/get-inventory-location-by-barcode.query.js';
import { GetInventoryLocationStatsQuery } from '@application/queries/inventory-location/get-inventory-location-stats.query.js';
import { ListInventoryLocationsQuery } from '@application/queries/inventory-location/list-inventory-locations.query.js';
import { ListPickableInventoryLocationsQuery } from '@application/queries/inventory-location/list-pickable-inventory-locations.query.js';

import {
  CreateInventoryLocationHttpDTO,
  UpdateInventoryLocationHttpDTO,
  StockChangeHttpDTO,
  QuarantineHttpDTO,
  InventoryLocationReasonHttpDTO,
  ListInventoryLocationsHttpQueryDTO,
} from '../../dtos/requests/inventory-location/inventory-location.request.dto.js';
import type {
  InventoryLocationHttpResponseDTO,
  InventoryLocationListHttpResponseDTO,
  InventoryLocationStatsHttpResponseDTO,
  InventoryLocationInitiateHttpResponseDTO,
} from '../../dtos/responses/inventory-location/inventory-location.response.dto.js';

import { InventoryLocationControllerMapper } from '../../mappers/inventory-location.controller.mapper.js';
import { InventoryLocationHttpValidator } from '../../validators/inventory-location.validator.js';
import { InventoryLocationLoggingInterceptor } from '../../interceptors/inventory-location-logging.interceptor.js';
import { InventoryLocationTimeoutInterceptor } from '../../interceptors/inventory-location-timeout.interceptor.js';
import {
  ApiCreateInventoryLocation,
  ApiGetInventoryLocation,
  ApiListInventoryLocations,
  ApiGetInventoryLocationStats,
  ApiInventoryLocationTransition,
  ApiInventoryLocationTag,
} from '../../swagger/inventory-location.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiInventoryLocationTag()
@ApiBearerAuth('bearer')
@Controller('inventory-locations')
@UseGuards(JwtAuthGuard)
@UseInterceptors(InventoryLocationLoggingInterceptor, InventoryLocationTimeoutInterceptor)
export class InventoryLocationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateInventoryLocation()
  async create(
    @Body() body: CreateInventoryLocationHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationInitiateHttpResponseDTO> {
    InventoryLocationHttpValidator.validateCreate(body);
    const appDto = InventoryLocationControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateInventoryLocationCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateInventoryLocationCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      inventoryLocationId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  @Patch(':id')
  @ApiInventoryLocationTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateInventoryLocationHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    InventoryLocationHttpValidator.validateUpdate({ inventoryLocationId: id, ...body });
    const appDto = InventoryLocationControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new UpdateInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/add-stock')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('add-stock')
  async addStock(
    @Param('id') id: string,
    @Body() body: StockChangeHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = InventoryLocationControllerMapper.toAddStockAppDto(id, body);
    const r = await this.commandBus.execute<AddStockInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new AddStockInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/remove-stock')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('remove-stock')
  async removeStock(
    @Param('id') id: string,
    @Body() body: StockChangeHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = InventoryLocationControllerMapper.toRemoveStockAppDto(id, body);
    const r = await this.commandBus.execute<RemoveStockInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new RemoveStockInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<InventoryLocationHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivateInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new ActivateInventoryLocationCommand({ inventoryLocationId: id } as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: InventoryLocationReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = InventoryLocationControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<DeactivateInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new DeactivateInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/quarantine')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('quarantine')
  async quarantine(
    @Param('id') id: string,
    @Body() body: QuarantineHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = InventoryLocationControllerMapper.toQuarantineAppDto(id, body);
    const r = await this.commandBus.execute<QuarantineInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new QuarantineInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/unquarantine')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('unquarantine')
  async unquarantine(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<InventoryLocationHttpResponseDTO> {
    const r = await this.commandBus.execute<UnquarantineInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new UnquarantineInventoryLocationCommand({ inventoryLocationId: id } as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiInventoryLocationTransition('archive')
  async archive(
    @Param('id') id: string,
    @Body() body: InventoryLocationReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = InventoryLocationControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<ArchiveInventoryLocationCommand, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new ArchiveInventoryLocationCommand(appDto as never, this.getActorId(user))
    );
    return InventoryLocationControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetInventoryLocationStats()
  async getStats(): Promise<InventoryLocationStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInventoryLocationStatsQuery, Parameters<typeof InventoryLocationControllerMapper.toStatsHttp>[0]>(
      new GetInventoryLocationStatsQuery()
    );
    return InventoryLocationControllerMapper.toStatsHttp(appDto);
  }

  @Get('pickable')
  @ApiListInventoryLocations()
  async listPickable(
    @Query('warehouseId') warehouseId: string,
  ): Promise<InventoryLocationListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListPickableInventoryLocationsQuery, Parameters<typeof InventoryLocationControllerMapper.toListHttp>[0]>(
      new ListPickableInventoryLocationsQuery(warehouseId)
    );
    return InventoryLocationControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetInventoryLocation()
  async getByCode(@Param('code') code: string): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInventoryLocationByCodeQuery, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new GetInventoryLocationByCodeQuery(code)
    );
    return InventoryLocationControllerMapper.toHttpResponse(appDto);
  }

  @Get('barcode/:barcode')
  @ApiGetInventoryLocation()
  async getByBarcode(@Param('barcode') barcode: string): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInventoryLocationByBarcodeQuery, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new GetInventoryLocationByBarcodeQuery(barcode)
    );
    return InventoryLocationControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetInventoryLocation()
  async getById(@Param('id') id: string): Promise<InventoryLocationHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetInventoryLocationQuery, Parameters<typeof InventoryLocationControllerMapper.toHttpResponse>[0]>(
      new GetInventoryLocationQuery(id)
    );
    return InventoryLocationControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListInventoryLocations()
  async list(@Query() query: ListInventoryLocationsHttpQueryDTO): Promise<InventoryLocationListHttpResponseDTO> {
    const options = InventoryLocationControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListInventoryLocationsQuery, Parameters<typeof InventoryLocationControllerMapper.toListHttp>[0]>(
      new ListInventoryLocationsQuery(options as never)
    );
    return InventoryLocationControllerMapper.toListHttp(appDto);
  }
}
