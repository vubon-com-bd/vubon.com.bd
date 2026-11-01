/**
 * ReturnShipmentController — REST endpoints
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

import { CreateReturnShipmentCommand } from '@application/commands/return-shipment/create-return-shipment.command.js';
import { ApproveReturnShipmentCommand } from '@application/commands/return-shipment/approve.command.js';
import { RejectReturnShipmentCommand } from '@application/commands/return-shipment/reject.command.js';
import { SchedulePickupReturnShipmentCommand } from '@application/commands/return-shipment/schedule-pickup.command.js';
import { MarkPickedUpReturnShipmentCommand } from '@application/commands/return-shipment/mark-picked-up.command.js';
import { StartTransitReturnShipmentCommand } from '@application/commands/return-shipment/start-transit.command.js';
import { MarkReceivedReturnShipmentCommand } from '@application/commands/return-shipment/mark-received.command.js';
import { InspectReturnShipmentCommand } from '@application/commands/return-shipment/inspect.command.js';
import { CompleteReturnShipmentCommand } from '@application/commands/return-shipment/complete.command.js';
import { CancelReturnShipmentCommand } from '@application/commands/return-shipment/cancel.command.js';
import { MarkLostReturnShipmentCommand } from '@application/commands/return-shipment/mark-lost.command.js';

import { GetReturnShipmentQuery } from '@application/queries/return-shipment/get-return-shipment.query.js';
import { GetReturnShipmentByRmaQuery } from '@application/queries/return-shipment/get-return-shipment-by-rma.query.js';
import { GetReturnShipmentStatsQuery } from '@application/queries/return-shipment/get-return-shipment-stats.query.js';
import { ListReturnShipmentsQuery } from '@application/queries/return-shipment/list-return-shipments.query.js';
import { ListPendingReturnsQuery } from '@application/queries/return-shipment/list-pending-returns.query.js';

import {
  CreateReturnShipmentHttpDTO,
  ApproveReturnHttpDTO,
  RejectReturnHttpDTO,
  MarkReceivedHttpDTO,
  InspectReturnHttpDTO,
  CompleteReturnHttpDTO,
  ReturnShipmentReasonHttpDTO,
  ListReturnShipmentsHttpQueryDTO,
} from '../../dtos/requests/return-shipment/return-shipment.request.dto.js';
import type {
  ReturnShipmentHttpResponseDTO,
  ReturnShipmentListHttpResponseDTO,
  ReturnShipmentStatsHttpResponseDTO,
  ReturnShipmentInitiateHttpResponseDTO,
} from '../../dtos/responses/return-shipment/return-shipment.response.dto.js';

import { ReturnShipmentControllerMapper } from '../../mappers/return-shipment.controller.mapper.js';
import { ReturnShipmentHttpValidator } from '../../validators/return-shipment.validator.js';
import { ReturnShipmentLoggingInterceptor } from '../../interceptors/return-shipment-logging.interceptor.js';
import { ReturnShipmentTimeoutInterceptor } from '../../interceptors/return-shipment-timeout.interceptor.js';
import {
  ApiCreateReturnShipment,
  ApiGetReturnShipment,
  ApiListReturnShipments,
  ApiGetReturnShipmentStats,
  ApiReturnShipmentTransition,
  ApiReturnShipmentTag,
} from '../../swagger/return-shipment.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiReturnShipmentTag()
@ApiBearerAuth('bearer')
@Controller('return-shipments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ReturnShipmentLoggingInterceptor, ReturnShipmentTimeoutInterceptor)
export class ReturnShipmentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateReturnShipment()
  async create(
    @Body() body: CreateReturnShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentInitiateHttpResponseDTO> {
    ReturnShipmentHttpValidator.validateCreate(body);
    const appDto = ReturnShipmentControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateReturnShipmentCommand,
      { readonly id: string; readonly rmaNumber: string; readonly status: string }
    >(new CreateReturnShipmentCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      returnShipmentId: result.id,
      rmaNumber: result.rmaNumber,
      status: result.status,
    };
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('approve')
  async approve(
    @Param('id') id: string,
    @Body() body: ApproveReturnHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toApproveAppDto(id, body);
    const r = await this.commandBus.execute<ApproveReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new ApproveReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('reject')
  async reject(
    @Param('id') id: string,
    @Body() body: RejectReturnHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toRejectAppDto(id, body);
    const r = await this.commandBus.execute<RejectReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new RejectReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/schedule-pickup')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('schedule-pickup')
  async schedulePickup(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ReturnShipmentHttpResponseDTO> {
    const r = await this.commandBus.execute<SchedulePickupReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new SchedulePickupReturnShipmentCommand({ returnId: id } as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/pick-up')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('pick-up')
  async markPickedUp(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ReturnShipmentHttpResponseDTO> {
    const r = await this.commandBus.execute<MarkPickedUpReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new MarkPickedUpReturnShipmentCommand({ returnId: id } as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/start-transit')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('start-transit')
  async startTransit(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ReturnShipmentHttpResponseDTO> {
    const r = await this.commandBus.execute<StartTransitReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new StartTransitReturnShipmentCommand({ returnId: id } as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/receive')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('receive')
  async markReceived(
    @Param('id') id: string,
    @Body() body: MarkReceivedHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toReceivedAppDto(id, body);
    const r = await this.commandBus.execute<MarkReceivedReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new MarkReceivedReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/inspect')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('inspect')
  async inspect(
    @Param('id') id: string,
    @Body() body: InspectReturnHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toInspectAppDto(id, body);
    const r = await this.commandBus.execute<InspectReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new InspectReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('complete')
  async complete(
    @Param('id') id: string,
    @Body() body: CompleteReturnHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toCompleteAppDto(id, body);
    const r = await this.commandBus.execute<CompleteReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new CompleteReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: ReturnShipmentReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = ReturnShipmentControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<CancelReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new CancelReturnShipmentCommand(appDto as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-lost')
  @HttpCode(HttpStatus.OK)
  @ApiReturnShipmentTransition('mark-lost')
  async markLost(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ReturnShipmentHttpResponseDTO> {
    const r = await this.commandBus.execute<MarkLostReturnShipmentCommand, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new MarkLostReturnShipmentCommand({ returnId: id } as never, this.getActorId(user))
    );
    return ReturnShipmentControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetReturnShipmentStats()
  async getStats(): Promise<ReturnShipmentStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnShipmentStatsQuery, Parameters<typeof ReturnShipmentControllerMapper.toStatsHttp>[0]>(
      new GetReturnShipmentStatsQuery()
    );
    return ReturnShipmentControllerMapper.toStatsHttp(appDto);
  }

  @Get('pending')
  @ApiListReturnShipments()
  async listPending(): Promise<ReturnShipmentListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListPendingReturnsQuery, Parameters<typeof ReturnShipmentControllerMapper.toListHttp>[0]>(
      new ListPendingReturnsQuery()
    );
    return ReturnShipmentControllerMapper.toListHttp(appDto);
  }

  @Get('rma/:rmaNumber')
  @ApiGetReturnShipment()
  async getByRma(@Param('rmaNumber') rmaNumber: string): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnShipmentByRmaQuery, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new GetReturnShipmentByRmaQuery(rmaNumber)
    );
    return ReturnShipmentControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetReturnShipment()
  async getById(@Param('id') id: string): Promise<ReturnShipmentHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnShipmentQuery, Parameters<typeof ReturnShipmentControllerMapper.toHttpResponse>[0]>(
      new GetReturnShipmentQuery(id)
    );
    return ReturnShipmentControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListReturnShipments()
  async list(@Query() query: ListReturnShipmentsHttpQueryDTO): Promise<ReturnShipmentListHttpResponseDTO> {
    const options = ReturnShipmentControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListReturnShipmentsQuery, Parameters<typeof ReturnShipmentControllerMapper.toListHttp>[0]>(
      new ListReturnShipmentsQuery(options as never)
    );
    return ReturnShipmentControllerMapper.toListHttp(appDto);
  }
}
