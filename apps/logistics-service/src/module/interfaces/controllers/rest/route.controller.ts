import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { CreateRouteCommand } from '../../../application/commands/route/create-route.command';
import { OptimizeRouteCommand } from '../../../application/commands/route/optimize-route.command';
import { GetRouteQuery } from '../../../application/queries/route/get-route.query';
import { ListRoutesQuery } from '../../../application/queries/route/list-routes.query';
import type { CreateRouteRequestDTO } from '../../dtos/requests/route.request.dto';

@Controller('logistics/routes')
@UseGuards(JwtAuthGuard)
export class RouteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.ROUTE_MANAGE)
  async create(@Body() body: CreateRouteRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateRouteCommand(body.name, body.type, body.zoneIds),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.ROUTE_VIEW)
  async list(@Query('optimizedOnly') optimizedOnly?: string): Promise<unknown> {
    return this.queryBus.execute(new ListRoutesQuery(optimizedOnly === 'true'));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.ROUTE_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetRouteQuery(id));
  }

  @Post(':id/optimize')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.ROUTE_MANAGE)
  async optimize(
    @Param('id') id: string,
    @Body() body: { optimization: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new OptimizeRouteCommand(id, body.optimization));
  }
}
