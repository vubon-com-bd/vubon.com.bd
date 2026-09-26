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
import { CreateZoneCommand } from '../../../application/commands/zone/create-zone.command';
import { GetZoneQuery } from '../../../application/queries/zone/get-zone.query';
import { ListZonesQuery } from '../../../application/queries/zone/list-zones.query';
import type { CreateZoneRequestDTO } from '../../dtos/requests/zone.request.dto';

@Controller('logistics/zones')
@UseGuards(JwtAuthGuard)
export class ZoneController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.ZONE_MANAGE)
  async create(@Body() body: CreateZoneRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateZoneCommand(
        body.code,
        body.name,
        body.type,
        body.divisions,
        body.districts,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.ZONE_VIEW)
  async list(@Query('type') type?: string): Promise<unknown> {
    return this.queryBus.execute(new ListZonesQuery(type));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.ZONE_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetZoneQuery(id));
  }
}
