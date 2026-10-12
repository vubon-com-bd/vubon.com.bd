import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateRouteCommand } from '../../../application/commands/route/create-route.command.js';
import { AddRouteStopCommand } from '../../../application/commands/route/add-route-stop.command.js';
import { RemoveRouteStopCommand } from '../../../application/commands/route/remove-route-stop.command.js';
import { ReorderRouteStopsCommand } from '../../../application/commands/route/reorder-route-stops.command.js';
import { CompleteRouteStopCommand } from '../../../application/commands/route/complete-route-stop.command.js';
import { OptimizeRouteCommand } from '../../../application/commands/route/optimize-route.command.js';
import { PlanRouteCommand } from '../../../application/commands/route/plan-route.command.js';
import { StartRouteCommand } from '../../../application/commands/route/start-route.command.js';
import { CompleteRouteCommand } from '../../../application/commands/route/complete-route.command.js';
import { CancelRouteCommand } from '../../../application/commands/route/cancel-route.command.js';
import { GetRouteQuery } from '../../../application/queries/route/get-route.query.js';
import { ListRoutesQuery } from '../../../application/queries/route/list-routes.query.js';
import {
  CreateRouteHttpDTO, AddRouteStopHttpDTO, ReorderRouteStopsHttpDTO,
  OptimizeRouteHttpDTO, CancelRouteHttpDTO, ListRoutesHttpQueryDTO,
} from '../../dtos/requests/route.request.dto.js';
import { RouteControllerMapper } from '../../mappers/route.controller.mapper.js';
import type { RouteResponseDTO, RouteListResponseDTO } from '../../../application/dtos/responses/route/route-response.dto.js';

@ApiTags('routes')
@ApiBearerAuth('bearer')
@Controller('logistics/routes')
@UseGuards(JwtAuthGuard)
export class RouteController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create a route' })
  async create(@Body() dto: CreateRouteHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new CreateRouteCommand(RouteControllerMapper.toCreateDto(dto), user.userId));
  }
  @Post(':id/stops') @ApiOperation({ summary: 'Add a stop to route' })
  async addStop(@Param('id') id: string, @Body() dto: AddRouteStopHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new AddRouteStopCommand(RouteControllerMapper.toAddStopDto(id, dto), user.userId));
  }
  @Patch(':id/stops/:stopId/remove') @ApiOperation({ summary: 'Remove a stop from route' })
  async removeStop(@Param('id') id: string, @Param('stopId') stopId: string, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new RemoveRouteStopCommand(RouteControllerMapper.toRemoveStopDto(id, stopId), user.userId));
  }
  @Patch(':id/stops/reorder') @ApiOperation({ summary: 'Reorder route stops' })
  async reorderStops(@Param('id') id: string, @Body() dto: ReorderRouteStopsHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new ReorderRouteStopsCommand(RouteControllerMapper.toReorderDto(id, dto), user.userId));
  }
  @Patch(':id/stops/:stopId/complete') @ApiOperation({ summary: 'Mark a stop as completed' })
  async completeStop(@Param('id') id: string, @Param('stopId') stopId: string, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new CompleteRouteStopCommand(RouteControllerMapper.toCompleteStopDto(id, stopId), user.userId));
  }
  @Post(':id/optimize') @ApiOperation({ summary: 'Optimize route stops' })
  async optimize(@Param('id') id: string, @Body() dto: OptimizeRouteHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new OptimizeRouteCommand(RouteControllerMapper.toOptimizeDto(id, dto), user.userId));
  }
  @Patch(':id/plan') @ApiOperation({ summary: 'Plan the route' })
  async plan(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new PlanRouteCommand(RouteControllerMapper.toPlanDto(id), user.userId));
  }
  @Patch(':id/start') @ApiOperation({ summary: 'Start the route' })
  async start(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new StartRouteCommand(RouteControllerMapper.toStartDto(id), user.userId));
  }
  @Patch(':id/complete') @ApiOperation({ summary: 'Complete the route' })
  async complete(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new CompleteRouteCommand(RouteControllerMapper.toCompleteDto(id), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel the route' })
  async cancel(@Param('id') id: string, @Body() dto: CancelRouteHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<RouteResponseDTO> {
    return this.commandBus.execute(new CancelRouteCommand(RouteControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List routes' })
  async list(@Query() q: ListRoutesHttpQueryDTO): Promise<RouteListResponseDTO> {
    return this.queryBus.execute(new ListRoutesQuery(RouteControllerMapper.toListOptions(q)));
  }
  @Get(':id') @ApiOperation({ summary: 'Get route by id' })
  async getById(@Param('id') id: string): Promise<RouteResponseDTO> {
    return this.queryBus.execute(new GetRouteQuery(id));
  }
}
