/**
 * ZoneController — REST endpoints
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

import { CreateZoneCommand } from '@application/commands/zone/create-zone.command.js';
import { UpdateZoneCommand } from '@application/commands/zone/update.command.js';
import { ActivateZoneCommand } from '@application/commands/zone/activate.command.js';
import { DeactivateZoneCommand } from '@application/commands/zone/deactivate.command.js';
import { RestrictZoneCommand } from '@application/commands/zone/restrict.command.js';
import { SuspendZoneCommand } from '@application/commands/zone/suspend.command.js';
import { ArchiveZoneCommand } from '@application/commands/zone/archive.command.js';

import { GetZoneQuery } from '@application/queries/zone/get-zone.query.js';
import { GetZoneByCodeQuery } from '@application/queries/zone/get-zone-by-code.query.js';
import { GetZoneStatsQuery } from '@application/queries/zone/get-zone-stats.query.js';
import { ListZonesQuery } from '@application/queries/zone/list-zones.query.js';
import { ListActiveZonesQuery } from '@application/queries/zone/list-active-zones.query.js';

import {
  CreateZoneHttpDTO,
  UpdateZoneHttpDTO,
  ZoneReasonHttpDTO,
  ListZonesHttpQueryDTO,
} from '../../dtos/requests/zone/zone.request.dto.js';
import type {
  ZoneHttpResponseDTO,
  ZoneListHttpResponseDTO,
  ZoneStatsHttpResponseDTO,
  ZoneInitiateHttpResponseDTO,
} from '../../dtos/responses/zone/zone.response.dto.js';

import { ZoneControllerMapper } from '../../mappers/zone.controller.mapper.js';
import { ZoneHttpValidator } from '../../validators/zone.validator.js';
import { ZoneLoggingInterceptor } from '../../interceptors/zone-logging.interceptor.js';
import { ZoneTimeoutInterceptor } from '../../interceptors/zone-timeout.interceptor.js';
import {
  ApiCreateZone,
  ApiGetZone,
  ApiListZones,
  ApiGetZoneStats,
  ApiZoneTransition,
  ApiZoneTag,
} from '../../swagger/zone.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiZoneTag()
@ApiBearerAuth('bearer')
@Controller('zones')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ZoneLoggingInterceptor, ZoneTimeoutInterceptor)
export class ZoneController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateZone()
  async create(
    @Body() body: CreateZoneHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ZoneInitiateHttpResponseDTO> {
    ZoneHttpValidator.validateCreate(body);
    const appDto = ZoneControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateZoneCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateZoneCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      zoneId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  @Patch(':id')
  @ApiZoneTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateZoneHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ZoneHttpResponseDTO> {
    ZoneHttpValidator.validateUpdate({ zoneId: id, ...body });
    const appDto = ZoneControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new UpdateZoneCommand(appDto as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiZoneTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ZoneHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivateZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new ActivateZoneCommand({ zoneId: id } as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiZoneTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: ZoneReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ZoneHttpResponseDTO> {
    const appDto = ZoneControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<DeactivateZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new DeactivateZoneCommand(appDto as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Post(':id/restrict')
  @HttpCode(HttpStatus.OK)
  @ApiZoneTransition('restrict')
  async restrict(
    @Param('id') id: string,
    @Body() body: ZoneReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ZoneHttpResponseDTO> {
    const appDto = ZoneControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<RestrictZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new RestrictZoneCommand(appDto as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiZoneTransition('suspend')
  async suspend(
    @Param('id') id: string,
    @Body() body: ZoneReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ZoneHttpResponseDTO> {
    const appDto = ZoneControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<SuspendZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new SuspendZoneCommand(appDto as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiZoneTransition('archive')
  async archive(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ZoneHttpResponseDTO> {
    const r = await this.commandBus.execute<ArchiveZoneCommand, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new ArchiveZoneCommand({ zoneId: id } as never, this.getActorId(user))
    );
    return ZoneControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetZoneStats()
  async getStats(): Promise<ZoneStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetZoneStatsQuery, Parameters<typeof ZoneControllerMapper.toStatsHttp>[0]>(
      new GetZoneStatsQuery()
    );
    return ZoneControllerMapper.toStatsHttp(appDto);
  }

  @Get('active')
  @ApiListZones()
  async listActive(): Promise<ZoneListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListActiveZonesQuery, Parameters<typeof ZoneControllerMapper.toListHttp>[0]>(
      new ListActiveZonesQuery()
    );
    return ZoneControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetZone()
  async getByCode(@Param('code') code: string): Promise<ZoneHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetZoneByCodeQuery, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new GetZoneByCodeQuery(code)
    );
    return ZoneControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetZone()
  async getById(@Param('id') id: string): Promise<ZoneHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetZoneQuery, Parameters<typeof ZoneControllerMapper.toHttpResponse>[0]>(
      new GetZoneQuery(id)
    );
    return ZoneControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListZones()
  async list(@Query() query: ListZonesHttpQueryDTO): Promise<ZoneListHttpResponseDTO> {
    const options = ZoneControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListZonesQuery, Parameters<typeof ZoneControllerMapper.toListHttp>[0]>(
      new ListZonesQuery(options as never)
    );
    return ZoneControllerMapper.toListHttp(appDto);
  }
}
