/**
 * ShipmentController — REST endpoints (19 routes)
 * @module logistics-service/interfaces/controllers/rest
 *
 * ⚠️ Interceptor order: Logging → Timeout → Cache (NOT cache-first)
 * ⚠️ commandBus.execute<T, R>() explicit generic cast
 * ⚠️ idempotencyKey merged ONCE in dto
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateShipmentCommand } from '@application/commands/shipment/create-shipment.command.js';
import { UpdateShipmentCommand } from '@application/commands/shipment/update-shipment.command.js';
import { CancelShipmentCommand } from '@application/commands/shipment/cancel-shipment.command.js';
import { ConfirmShipmentCommand } from '@application/commands/shipment/confirm-shipment.command.js';
import { StartProcessingCommand } from '@application/commands/shipment/start-processing.command.js';
import { PackShipmentCommand } from '@application/commands/shipment/pack-shipment.command.js';
import { PickUpShipmentCommand } from '@application/commands/shipment/pick-up-shipment.command.js';
import { StartTransitCommand } from '@application/commands/shipment/start-transit.command.js';
import { OutForDeliveryCommand } from '@application/commands/shipment/out-for-delivery.command.js';
import { DeliverShipmentCommand } from '@application/commands/shipment/deliver-shipment.command.js';
import { FailShipmentCommand } from '@application/commands/shipment/fail-shipment.command.js';
import { ReturnShipmentCommand } from '@application/commands/shipment/return-shipment.command.js';
import { PutOnHoldCommand } from '@application/commands/shipment/put-on-hold.command.js';
import { MarkDelayedCommand } from '@application/commands/shipment/mark-delayed.command.js';
import { ResumeFromHoldCommand } from '@application/commands/shipment/resume-from-hold.command.js';

import { GetShipmentQuery } from '@application/queries/shipment/get-shipment.query.js';
import { ListShipmentsQuery } from '@application/queries/shipment/list-shipments.query.js';
import { GetShipmentStatsQuery } from '@application/queries/shipment/get-shipment-stats.query.js';
import { GetShipmentTimelineQuery } from '@application/queries/shipment/get-shipment-timeline.query.js';

import {
  CreateShipmentHttpDTO,
  UpdateShipmentHttpDTO,
  CancelShipmentHttpDTO,
  ConfirmShipmentHttpDTO,
  PickUpShipmentHttpDTO,
  StartTransitShipmentHttpDTO,
  DeliverShipmentHttpDTO,
  FailShipmentHttpDTO,
  ListShipmentsHttpQueryDTO,
} from '../../dtos/requests/shipment/shipment.request.dto.js';
import type {
  ShipmentHttpResponseDTO,
  ShipmentInitiateHttpResponseDTO,
  ShipmentListHttpResponseDTO,
  ShipmentStatsHttpResponseDTO,
} from '../../dtos/responses/shipment/shipment.response.dto.js';

import { ShipmentControllerMapper } from '../../mappers/shipment.controller.mapper.js';
import { ShipmentHttpValidator } from '../../validators/shipment.validator.js';
import { ShipmentOwnerGuard } from '../../guards/shipment-owner.guard.js';
import { ShipmentLoggingInterceptor } from '../../interceptors/shipment-logging.interceptor.js';
import { ShipmentTimeoutInterceptor } from '../../interceptors/shipment-timeout.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiCreateShipment,
  ApiGetShipment,
  ApiListShipments,
  ApiGetShipmentStats,
  ApiShipmentTransition,
  ApiShipmentTag,
} from '../../swagger/shipment.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiShipmentTag()
@ApiBearerAuth('bearer')
@Controller('shipments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  ShipmentLoggingInterceptor,
  ShipmentTimeoutInterceptor,

)
export class ShipmentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  // ═══ Create ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateShipment()
  async create(
    @Body() body: CreateShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<ShipmentInitiateHttpResponseDTO> {
    ShipmentHttpValidator.validateCreate(body);

    const appDto = ShipmentControllerMapper.toCreateAppDto({
      ...body,
      idempotencyKey: idempotencyKey ?? body.idempotencyKey,
    });

    const result = await this.commandBus.execute<
      CreateShipmentCommand,
      { readonly id: string; readonly shipmentNumber: string; readonly trackingNumber: string; readonly status: string }
    >(new CreateShipmentCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      shipmentId: result.id,
      shipmentNumber: result.shipmentNumber,
      trackingNumber: result.trackingNumber,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const appDto = ShipmentControllerMapper.toUpdateAppDto(id, body);
    const result = await this.commandBus.execute<
      UpdateShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new UpdateShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  // ═══ State transitions ═══
  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: CancelShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const appDto = ShipmentControllerMapper.toCancelAppDto(id, body);
    const result = await this.commandBus.execute<
      CancelShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new CancelShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('confirm')
  async confirm(
    @Param('id') id: string,
    @Body() body: ConfirmShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const appDto = ShipmentControllerMapper.toConfirmAppDto(id, body);
    const result = await this.commandBus.execute<
      ConfirmShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new ConfirmShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/start-processing')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('start-processing')
  async startProcessing(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      StartProcessingCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new StartProcessingCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/pack')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('pack')
  async pack(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      PackShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new PackShipmentCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/pick-up')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('pick-up')
  async pickUp(
    @Param('id') id: string,
    @Body() body: PickUpShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    ShipmentHttpValidator.validatePickUp({ shipmentId: id, ...body });
    const appDto = ShipmentControllerMapper.toPickUpAppDto(id, body);
    const result = await this.commandBus.execute<
      PickUpShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new PickUpShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/start-transit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('start-transit')
  async startTransit(
    @Param('id') id: string,
    @Body() body: StartTransitShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const appDto = ShipmentControllerMapper.toStartTransitAppDto(id, body);
    const result = await this.commandBus.execute<
      StartTransitCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new StartTransitCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/out-for-delivery')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('out-for-delivery')
  async outForDelivery(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      OutForDeliveryCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new OutForDeliveryCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/deliver')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('deliver')
  async deliver(
    @Param('id') id: string,
    @Body() body: DeliverShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    ShipmentHttpValidator.validateDeliver({ shipmentId: id, ...body });
    const appDto = ShipmentControllerMapper.toDeliverAppDto(id, body);
    const result = await this.commandBus.execute<
      DeliverShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new DeliverShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/fail')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('fail')
  async fail(
    @Param('id') id: string,
    @Body() body: FailShipmentHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    ShipmentHttpValidator.validateFail({ shipmentId: id, ...body });
    const appDto = ShipmentControllerMapper.toFailAppDto(id, body);
    const result = await this.commandBus.execute<
      FailShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new FailShipmentCommand(appDto as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/return')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('return')
  async returnShipment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ReturnShipmentCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new ReturnShipmentCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/put-on-hold')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('put-on-hold')
  async putOnHold(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      PutOnHoldCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new PutOnHoldCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/mark-delayed')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('mark-delayed')
  async markDelayed(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      MarkDelayedCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new MarkDelayedCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  @Post(':id/resume-from-hold')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShipmentOwnerGuard)
  @ApiShipmentTransition('resume-from-hold')
  async resumeFromHold(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ResumeFromHoldCommand,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new ResumeFromHoldCommand({ shipmentId: id } as never, this.getActorId(user)));
    return ShipmentControllerMapper.toHttpResponse(result);
  }

  // ═══ Read ═══
  @Get(':id')
  @UseGuards(ShipmentOwnerGuard)
  @ApiGetShipment()
  async getById(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetShipmentQuery,
      Parameters<typeof ShipmentControllerMapper.toHttpResponse>[0]
    >(new GetShipmentQuery(id));
    return ShipmentControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListShipments()
  async list(
    @Query() query: ListShipmentsHttpQueryDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShipmentListHttpResponseDTO> {
    const options = ShipmentControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<
      ListShipmentsQuery,
      Parameters<typeof ShipmentControllerMapper.toListHttp>[0]
    >(new ListShipmentsQuery(options as never));
    return ShipmentControllerMapper.toListHttp(appDto);
  }

  @Get('stats/summary')
  @ApiGetShipmentStats()
  async getStats(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('warehouseId') warehouseId?: string,
  ): Promise<ShipmentStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetShipmentStatsQuery,
      Parameters<typeof ShipmentControllerMapper.toStatsHttp>[0]
    >(new GetShipmentStatsQuery(fromDate, toDate, warehouseId));
    return ShipmentControllerMapper.toStatsHttp(appDto);
  }

  @Get(':id/timeline')
  @UseGuards(ShipmentOwnerGuard)
  async getTimeline(
    @Param('id') id: string,
  ): Promise<Record<string, unknown>> {
    const result = await this.queryBus.execute<
      GetShipmentTimelineQuery,
      Record<string, unknown>
    >(new GetShipmentTimelineQuery(id));
    return result;
  }
}
