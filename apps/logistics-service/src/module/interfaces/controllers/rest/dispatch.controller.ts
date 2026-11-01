/**
 * DispatchController — REST endpoints
 * @module logistics-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param,
  Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateDispatchCommand } from '@application/commands/dispatch/create-dispatch.command.js';
import { AssignDispatchCommand } from '@application/commands/dispatch/assign.command.js';
import { DispatchDispatchCommand } from '@application/commands/dispatch/dispatch.command.js';
import { CancelDispatchCommand } from '@application/commands/dispatch/cancel.command.js';
import { StartTransitDispatchCommand } from '@application/commands/dispatch/start-transit.command.js';
import { MarkDeliveredDispatchCommand } from '@application/commands/dispatch/mark-delivered.command.js';
import { MarkFailedDispatchCommand } from '@application/commands/dispatch/mark-failed.command.js';
import { MarkReturnedDispatchCommand } from '@application/commands/dispatch/mark-returned.command.js';

import { GetDispatchQuery } from '@application/queries/dispatch/get-dispatch.query.js';
import { GetDispatchByNumberQuery } from '@application/queries/dispatch/get-dispatch-by-number.query.js';
import { GetDispatchStatsQuery } from '@application/queries/dispatch/get-dispatch-stats.query.js';
import { ListDispatchesQuery } from '@application/queries/dispatch/list-dispatches.query.js';
import { ListPendingDispatchQuery } from '@application/queries/dispatch/list-pending.query.js';
import { ListInTransitDispatchQuery } from '@application/queries/dispatch/list-in-transit.query.js';

import {
  CreateDispatchHttpDTO,
  AssignDispatchHttpDTO,
  DispatchReasonHttpDTO,
  ListDispatchesHttpQueryDTO,
} from '../../dtos/requests/dispatch/dispatch.request.dto.js';
import type {
  DispatchHttpResponseDTO,
  DispatchListHttpResponseDTO,
  DispatchStatsHttpResponseDTO,
  DispatchInitiateHttpResponseDTO,
} from '../../dtos/responses/dispatch/dispatch.response.dto.js';

import { DispatchControllerMapper } from '../../mappers/dispatch.controller.mapper.js';
import { DispatchHttpValidator } from '../../validators/dispatch.validator.js';
import { DispatchLoggingInterceptor } from '../../interceptors/dispatch-logging.interceptor.js';
import { DispatchTimeoutInterceptor } from '../../interceptors/dispatch-timeout.interceptor.js';
import {
  ApiCreateDispatch,
  ApiGetDispatch,
  ApiListDispatches,
  ApiGetDispatchStats,
  ApiDispatchTransition,
  ApiDispatchTag,
} from '../../swagger/dispatch.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiDispatchTag()
@ApiBearerAuth('bearer')
@Controller('dispatches')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DispatchLoggingInterceptor, DispatchTimeoutInterceptor)
export class DispatchController extends BaseController {
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
  @ApiCreateDispatch()
  async create(
    @Body() body: CreateDispatchHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchInitiateHttpResponseDTO> {
    DispatchHttpValidator.validateCreate(body);
    const appDto = DispatchControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateDispatchCommand,
      { readonly id: string; readonly dispatchNumber: string; readonly status: string }
    >(new CreateDispatchCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      dispatchId: result.id,
      dispatchNumber: result.dispatchNumber,
      status: result.status,
    };
  }

  // ═══ State transitions ═══
  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('assign')
  async assign(
    @Param('id') id: string,
    @Body() body: AssignDispatchHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    DispatchHttpValidator.validateAssign({ dispatchId: id, ...body });
    const appDto = DispatchControllerMapper.toAssignAppDto(id, body);
    const r = await this.commandBus.execute<AssignDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new AssignDispatchCommand(appDto as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/dispatch')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('dispatch')
  async dispatchAction(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const r = await this.commandBus.execute<DispatchDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new DispatchDispatchCommand({ dispatchId: id } as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/start-transit')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('start-transit')
  async startTransit(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const r = await this.commandBus.execute<StartTransitDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new StartTransitDispatchCommand({ dispatchId: id } as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-delivered')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('mark-delivered')
  async markDelivered(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const r = await this.commandBus.execute<MarkDeliveredDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new MarkDeliveredDispatchCommand({ dispatchId: id } as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-failed')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('mark-failed')
  async markFailed(
    @Param('id') id: string,
    @Body() body: DispatchReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const appDto = DispatchControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<MarkFailedDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new MarkFailedDispatchCommand(appDto as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-returned')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('mark-returned')
  async markReturned(
    @Param('id') id: string,
    @Body() body: DispatchReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const appDto = DispatchControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<MarkReturnedDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new MarkReturnedDispatchCommand(appDto as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiDispatchTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: DispatchReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DispatchHttpResponseDTO> {
    const appDto = DispatchControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<CancelDispatchCommand, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new CancelDispatchCommand(appDto as never, this.getActorId(user))
    );
    return DispatchControllerMapper.toHttpResponse(r);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetDispatchStats()
  async getStats(): Promise<DispatchStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDispatchStatsQuery, Parameters<typeof DispatchControllerMapper.toStatsHttp>[0]>(
      new GetDispatchStatsQuery()
    );
    return DispatchControllerMapper.toStatsHttp(appDto);
  }

  @Get('pending')
  @ApiListDispatches()
  async listPending(): Promise<DispatchListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListPendingDispatchQuery, Parameters<typeof DispatchControllerMapper.toListHttp>[0]>(
      new ListPendingDispatchQuery()
    );
    return DispatchControllerMapper.toListHttp(appDto);
  }

  @Get('in-transit')
  @ApiListDispatches()
  async listInTransit(): Promise<DispatchListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListInTransitDispatchQuery, Parameters<typeof DispatchControllerMapper.toListHttp>[0]>(
      new ListInTransitDispatchQuery()
    );
    return DispatchControllerMapper.toListHttp(appDto);
  }

  @Get('number/:dispatchNumber')
  @ApiGetDispatch()
  async getByNumber(@Param('dispatchNumber') dispatchNumber: string): Promise<DispatchHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDispatchByNumberQuery, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new GetDispatchByNumberQuery(dispatchNumber)
    );
    return DispatchControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetDispatch()
  async getById(@Param('id') id: string): Promise<DispatchHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDispatchQuery, Parameters<typeof DispatchControllerMapper.toHttpResponse>[0]>(
      new GetDispatchQuery(id)
    );
    return DispatchControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListDispatches()
  async list(@Query() query: ListDispatchesHttpQueryDTO): Promise<DispatchListHttpResponseDTO> {
    const options = DispatchControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListDispatchesQuery, Parameters<typeof DispatchControllerMapper.toListHttp>[0]>(
      new ListDispatchesQuery(options as never)
    );
    return DispatchControllerMapper.toListHttp(appDto);
  }
}
