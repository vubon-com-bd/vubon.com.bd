/**
 * FulfillmentController — REST endpoints
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

import { CreateFulfillmentCommand } from '@application/commands/fulfillment/create.command.js';
import { StartFulfillmentCommand } from '@application/commands/fulfillment/start.command.js';
import { BeginPickingFulfillmentCommand } from '@application/commands/fulfillment/begin-picking.command.js';
import { BeginPackingFulfillmentCommand } from '@application/commands/fulfillment/begin-packing.command.js';
import { MarkReadyToShipFulfillmentCommand } from '@application/commands/fulfillment/mark-ready-to-ship.command.js';
import { ShipFulfillmentCommand } from '@application/commands/fulfillment/ship.command.js';
import { FulfillFulfillmentCommand } from '@application/commands/fulfillment/fulfill.command.js';
import { PartiallyFulfillFulfillmentCommand } from '@application/commands/fulfillment/partially-fulfill.command.js';
import { CancelFulfillmentCommand } from '@application/commands/fulfillment/cancel.command.js';
import { FailFulfillmentCommand } from '@application/commands/fulfillment/fail.command.js';
import { PutOnHoldFulfillmentCommand } from '@application/commands/fulfillment/put-on-hold.command.js';
import { ResumeFromHoldFulfillmentCommand } from '@application/commands/fulfillment/resume-from-hold.command.js';

import { GetFulfillmentQuery } from '@application/queries/fulfillment/get.query.js';
import { GetStatsFulfillmentQuery } from '@application/queries/fulfillment/get-stats.query.js';
import { ListFulfillmentQuery } from '@application/queries/fulfillment/list.query.js';
import { ListPendingFulfillmentQuery } from '@application/queries/fulfillment/list-pending.query.js';
import { ListSlaBreachedFulfillmentQuery } from '@application/queries/fulfillment/list-sla-breached.query.js';

import {
  CreateFulfillmentHttpDTO,
  FulfillmentReasonHttpDTO,
  ListFulfillmentsHttpQueryDTO,
} from '../../dtos/requests/fulfillment/fulfillment.request.dto.js';
import type {
  FulfillmentHttpResponseDTO,
  FulfillmentListHttpResponseDTO,
  FulfillmentStatsHttpResponseDTO,
  FulfillmentInitiateHttpResponseDTO,
} from '../../dtos/responses/fulfillment/fulfillment.response.dto.js';

import { FulfillmentControllerMapper } from '../../mappers/fulfillment.controller.mapper.js';
import { FulfillmentHttpValidator } from '../../validators/fulfillment.validator.js';
import { FulfillmentLoggingInterceptor } from '../../interceptors/fulfillment-logging.interceptor.js';
import { FulfillmentTimeoutInterceptor } from '../../interceptors/fulfillment-timeout.interceptor.js';
import {
  ApiCreateFulfillment,
  ApiGetFulfillment,
  ApiListFulfillments,
  ApiGetFulfillmentStats,
  ApiFulfillmentTransition,
  ApiFulfillmentTag,
} from '../../swagger/fulfillment.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiFulfillmentTag()
@ApiBearerAuth('bearer')
@Controller('fulfillments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FulfillmentLoggingInterceptor, FulfillmentTimeoutInterceptor)
export class FulfillmentController extends BaseController {
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
  @ApiCreateFulfillment()
  async create(
    @Body() body: CreateFulfillmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentInitiateHttpResponseDTO> {
    FulfillmentHttpValidator.validateCreate(body);
    const appDto = FulfillmentControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateFulfillmentCommand,
      { readonly id: string; readonly orderId: string; readonly status: string }
    >(new CreateFulfillmentCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      fulfillmentId: result.id,
      orderId: result.orderId,
      status: result.status,
    };
  }

  // ═══ State transitions ═══
  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('start')
  async start(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<FulfillmentHttpResponseDTO> {
    const r = await this.commandBus.execute<StartFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new StartFulfillmentCommand({ fulfillmentId: id } as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/begin-picking')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('begin-picking')
  async beginPicking(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<FulfillmentHttpResponseDTO> {
    const r = await this.commandBus.execute<BeginPickingFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new BeginPickingFulfillmentCommand({ fulfillmentId: id } as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/begin-packing')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('begin-packing')
  async beginPacking(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<FulfillmentHttpResponseDTO> {
    const r = await this.commandBus.execute<BeginPackingFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new BeginPackingFulfillmentCommand({ fulfillmentId: id } as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-ready-to-ship')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('mark-ready-to-ship')
  async markReady(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<FulfillmentHttpResponseDTO> {
    const r = await this.commandBus.execute<MarkReadyToShipFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new MarkReadyToShipFulfillmentCommand({ fulfillmentId: id } as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/ship')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('ship')
  async ship(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<ShipFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new ShipFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/fulfill')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('fulfill')
  async fulfill(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<FulfillFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new FulfillFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/partially-fulfill')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('partially-fulfill')
  async partiallyFulfill(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<PartiallyFulfillFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new PartiallyFulfillFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<CancelFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new CancelFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/fail')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('fail')
  async fail(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<FailFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new FailFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/put-on-hold')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('put-on-hold')
  async putOnHold(
    @Param('id') id: string,
    @Body() body: FulfillmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<FulfillmentHttpResponseDTO> {
    const appDto = FulfillmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<PutOnHoldFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new PutOnHoldFulfillmentCommand(appDto as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/resume-from-hold')
  @HttpCode(HttpStatus.OK)
  @ApiFulfillmentTransition('resume-from-hold')
  async resumeFromHold(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<FulfillmentHttpResponseDTO> {
    const r = await this.commandBus.execute<ResumeFromHoldFulfillmentCommand, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new ResumeFromHoldFulfillmentCommand({ fulfillmentId: id } as never, this.getActorId(user))
    );
    return FulfillmentControllerMapper.toHttpResponse(r);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetFulfillmentStats()
  async getStats(): Promise<FulfillmentStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetStatsFulfillmentQuery, Parameters<typeof FulfillmentControllerMapper.toStatsHttp>[0]>(
      new GetStatsFulfillmentQuery()
    );
    return FulfillmentControllerMapper.toStatsHttp(appDto);
  }

  @Get('pending')
  @ApiListFulfillments()
  async listPending(): Promise<FulfillmentListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListPendingFulfillmentQuery, Parameters<typeof FulfillmentControllerMapper.toListHttp>[0]>(
      new ListPendingFulfillmentQuery()
    );
    return FulfillmentControllerMapper.toListHttp(appDto);
  }

  @Get('sla-breached')
  @ApiListFulfillments()
  async listSlaBreached(): Promise<FulfillmentListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListSlaBreachedFulfillmentQuery, Parameters<typeof FulfillmentControllerMapper.toListHttp>[0]>(
      new ListSlaBreachedFulfillmentQuery()
    );
    return FulfillmentControllerMapper.toListHttp(appDto);
  }

  @Get(':id')
  @ApiGetFulfillment()
  async getById(@Param('id') id: string): Promise<FulfillmentHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetFulfillmentQuery, Parameters<typeof FulfillmentControllerMapper.toHttpResponse>[0]>(
      new GetFulfillmentQuery(id)
    );
    return FulfillmentControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListFulfillments()
  async list(@Query() query: ListFulfillmentsHttpQueryDTO): Promise<FulfillmentListHttpResponseDTO> {
    const options = FulfillmentControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListFulfillmentQuery, Parameters<typeof FulfillmentControllerMapper.toListHttp>[0]>(
      new ListFulfillmentQuery(options as never)
    );
    return FulfillmentControllerMapper.toListHttp(appDto);
  }
}
