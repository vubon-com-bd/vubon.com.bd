/**
 * RouteController — REST endpoints
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

import { CreateRouteCommand } from '@application/commands/route/create-route.command.js';
import { UpdateRouteCommand } from '@application/commands/route/update.command.js';
import { PlanRouteCommand } from '@application/commands/route/plan.command.js';
import { OptimizeRouteCommand } from '@application/commands/route/optimize.command.js';
import { StartRouteCommand } from '@application/commands/route/start.command.js';
import { CompleteStopRouteCommand } from '@application/commands/route/complete-stop.command.js';
import { CompleteRouteCommand } from '@application/commands/route/complete.command.js';
import { CancelRouteCommand } from '@application/commands/route/cancel.command.js';
import { ArchiveRouteCommand } from '@application/commands/route/archive.command.js';

import { GetRouteQuery } from '@application/queries/route/get-route.query.js';
import { GetRouteByCodeQuery } from '@application/queries/route/get-route-by-code.query.js';
import { GetRouteStatsQuery } from '@application/queries/route/get-route-stats.query.js';
import { ListRoutesQuery } from '@application/queries/route/list-routes.query.js';
import { ListActiveRoutesQuery } from '@application/queries/route/list-active-routes.query.js';
import { ListPendingOptimizationQuery } from '@application/queries/route/list-pending-optimization.query.js';

import {
  CreateRouteHttpDTO,
  UpdateRouteHttpDTO,
  OptimizeRouteHttpDTO,
  CompleteStopHttpDTO,
  RouteReasonHttpDTO,
  ListRoutesHttpQueryDTO,
} from '../../dtos/requests/route/route.request.dto.js';
import type {
  RouteHttpResponseDTO,
  RouteListHttpResponseDTO,
  RouteStatsHttpResponseDTO,
  RouteInitiateHttpResponseDTO,
} from '../../dtos/responses/route/route.response.dto.js';

import { RouteControllerMapper } from '../../mappers/route.controller.mapper.js';
import { RouteHttpValidator } from '../../validators/route.validator.js';
import { RouteLoggingInterceptor } from '../../interceptors/route-logging.interceptor.js';
import { RouteTimeoutInterceptor } from '../../interceptors/route-timeout.interceptor.js';
import {
  ApiCreateRoute,
  ApiGetRoute,
  ApiListRoutes,
  ApiGetRouteStats,
  ApiRouteTransition,
  ApiRouteTag,
} from '../../swagger/route.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiRouteTag()
@ApiBearerAuth('bearer')
@Controller('routes')
@UseGuards(JwtAuthGuard)
@UseInterceptors(RouteLoggingInterceptor, RouteTimeoutInterceptor)
export class RouteController extends BaseController {
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
  @ApiCreateRoute()
  async create(
    @Body() body: CreateRouteHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<RouteInitiateHttpResponseDTO> {
    RouteHttpValidator.validateCreate(body);
    const appDto = RouteControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateRouteCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateRouteCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      routeId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @ApiRouteTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRouteHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<RouteHttpResponseDTO> {
    RouteHttpValidator.validateUpdate({ routeId: id, ...body });
    const appDto = RouteControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new UpdateRouteCommand(appDto as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  // ═══ State transitions ═══
  @Post(':id/plan')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('plan')
  async plan(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<RouteHttpResponseDTO> {
    const r = await this.commandBus.execute<PlanRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new PlanRouteCommand({ routeId: id } as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/optimize')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('optimize')
  async optimize(
    @Param('id') id: string,
    @Body() body: OptimizeRouteHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<RouteHttpResponseDTO> {
    const appDto = RouteControllerMapper.toOptimizeAppDto(id, body);
    const r = await this.commandBus.execute<OptimizeRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new OptimizeRouteCommand(appDto as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('start')
  async start(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<RouteHttpResponseDTO> {
    const r = await this.commandBus.execute<StartRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new StartRouteCommand({ routeId: id } as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/complete-stop')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('complete-stop')
  async completeStop(
    @Param('id') id: string,
    @Body() body: CompleteStopHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<RouteHttpResponseDTO> {
    const appDto = RouteControllerMapper.toCompleteStopAppDto(id, body);
    const r = await this.commandBus.execute<CompleteStopRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new CompleteStopRouteCommand(appDto as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('complete')
  async complete(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<RouteHttpResponseDTO> {
    const r = await this.commandBus.execute<CompleteRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new CompleteRouteCommand({ routeId: id } as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: RouteReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<RouteHttpResponseDTO> {
    const appDto = RouteControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<CancelRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new CancelRouteCommand(appDto as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiRouteTransition('archive')
  async archive(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<RouteHttpResponseDTO> {
    const r = await this.commandBus.execute<ArchiveRouteCommand, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new ArchiveRouteCommand({ routeId: id } as never, this.getActorId(user))
    );
    return RouteControllerMapper.toHttpResponse(r);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetRouteStats()
  async getStats(): Promise<RouteStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetRouteStatsQuery, Parameters<typeof RouteControllerMapper.toStatsHttp>[0]>(
      new GetRouteStatsQuery()
    );
    return RouteControllerMapper.toStatsHttp(appDto);
  }

  @Get('active')
  @ApiListRoutes()
  async listActive(): Promise<RouteListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListActiveRoutesQuery, Parameters<typeof RouteControllerMapper.toListHttp>[0]>(
      new ListActiveRoutesQuery()
    );
    return RouteControllerMapper.toListHttp(appDto);
  }

  @Get('pending-optimization')
  @ApiListRoutes()
  async listPendingOptimization(): Promise<RouteListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListPendingOptimizationQuery, Parameters<typeof RouteControllerMapper.toListHttp>[0]>(
      new ListPendingOptimizationQuery()
    );
    return RouteControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetRoute()
  async getByCode(@Param('code') code: string): Promise<RouteHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetRouteByCodeQuery, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new GetRouteByCodeQuery(code)
    );
    return RouteControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetRoute()
  async getById(@Param('id') id: string): Promise<RouteHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetRouteQuery, Parameters<typeof RouteControllerMapper.toHttpResponse>[0]>(
      new GetRouteQuery(id)
    );
    return RouteControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListRoutes()
  async list(@Query() query: ListRoutesHttpQueryDTO): Promise<RouteListHttpResponseDTO> {
    const options = RouteControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListRoutesQuery, Parameters<typeof RouteControllerMapper.toListHttp>[0]>(
      new ListRoutesQuery(options as never)
    );
    return RouteControllerMapper.toListHttp(appDto);
  }
}
