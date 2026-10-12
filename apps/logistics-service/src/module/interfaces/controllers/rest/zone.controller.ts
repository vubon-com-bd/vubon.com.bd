import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateZoneCommand } from '../../../application/commands/zone/create-zone.command.js';
import { UpdateZoneCommand } from '../../../application/commands/zone/update-zone.command.js';
import { ActivateZoneCommand } from '../../../application/commands/zone/activate-zone.command.js';
import { InactivateZoneCommand } from '../../../application/commands/zone/inactivate-zone.command.js';
import { SuspendZoneCommand } from '../../../application/commands/zone/suspend-zone.command.js';
import { GetZoneQuery } from '../../../application/queries/zone/get-zone.query.js';
import { ListZonesQuery } from '../../../application/queries/zone/list-zones.query.js';
import {
  CreateZoneHttpDTO, UpdateZoneHttpDTO, ZoneReasonHttpDTO, SuspendZoneHttpDTO, ListZonesHttpQueryDTO,
} from '../../dtos/requests/zone.request.dto.js';
import { ZoneControllerMapper } from '../../mappers/zone.controller.mapper.js';
import type { ZoneResponseDTO, ZoneListResponseDTO } from '../../../application/dtos/responses/zone/zone-response.dto.js';

@ApiTags('zones')
@ApiBearerAuth('bearer')
@Controller('logistics/zones')
@UseGuards(JwtAuthGuard)
export class ZoneController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create a zone' })
  async create(@Body() dto: CreateZoneHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ZoneResponseDTO> {
    return this.commandBus.execute(new CreateZoneCommand(ZoneControllerMapper.toCreateDto(dto), user.userId));
  }

  @Patch(':id') @ApiOperation({ summary: 'Update zone' })
  async update(@Param('id') id: string, @Body() dto: UpdateZoneHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ZoneResponseDTO> {
    return this.commandBus.execute(new UpdateZoneCommand(ZoneControllerMapper.toUpdateDto(id, dto), user.userId));
  }

  @Patch(':id/activate') @ApiOperation({ summary: 'Activate zone' })
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ZoneResponseDTO> {
    return this.commandBus.execute(new ActivateZoneCommand(ZoneControllerMapper.toActivateDto(id), user.userId));
  }

  @Patch(':id/inactivate') @ApiOperation({ summary: 'Inactivate zone' })
  async inactivate(@Param('id') id: string, @Body() dto: ZoneReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ZoneResponseDTO> {
    return this.commandBus.execute(new InactivateZoneCommand(ZoneControllerMapper.toInactivateDto(id, dto), user.userId));
  }

  @Patch(':id/suspend') @ApiOperation({ summary: 'Suspend zone' })
  async suspend(@Param('id') id: string, @Body() dto: SuspendZoneHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ZoneResponseDTO> {
    return this.commandBus.execute(new SuspendZoneCommand(ZoneControllerMapper.toSuspendDto(id, dto), user.userId));
  }

  @Get() @ApiOperation({ summary: 'List zones' })
  async list(@Query() q: ListZonesHttpQueryDTO): Promise<ZoneListResponseDTO> {
    return this.queryBus.execute(new ListZonesQuery(ZoneControllerMapper.toListOptions(q)));
  }

  @Get(':id') @ApiOperation({ summary: 'Get zone by id' })
  async getById(@Param('id') id: string): Promise<ZoneResponseDTO> {
    return this.queryBus.execute(new GetZoneQuery(id));
  }
}
