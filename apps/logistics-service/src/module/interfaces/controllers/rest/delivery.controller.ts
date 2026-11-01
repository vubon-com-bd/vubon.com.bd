/**
 * DeliveryController — REST endpoints
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

import { CreateDeliveryCommand } from '@application/commands/delivery/create-delivery.command.js';
import { ScheduleDeliveryCommand } from '@application/commands/delivery/schedule-delivery.command.js';
import { AssignDeliveryCommand } from '@application/commands/delivery/assign-delivery.command.js';
import { ArriveDeliveryCommand } from '@application/commands/delivery/arrive-delivery.command.js';
import { CompleteDeliveryCommand } from '@application/commands/delivery/complete-delivery.command.js';
import { FailDeliveryCommand } from '@application/commands/delivery/fail-delivery.command.js';
import { RescheduleDeliveryCommand } from '@application/commands/delivery/reschedule-delivery.command.js';
import { CancelDeliveryCommand } from '@application/commands/delivery/cancel-delivery.command.js';
import { RefuseDeliveryCommand } from '@application/commands/delivery/refuse-delivery.command.js';

import { GetDeliveryQuery } from '@application/queries/delivery/get-delivery.query.js';
import { ListDeliveriesQuery } from '@application/queries/delivery/list-deliveries.query.js';
import { GetDeliveryStatsQuery } from '@application/queries/delivery/get-delivery-stats.query.js';

import {
  CreateDeliveryHttpDTO,
  ScheduleDeliveryHttpDTO,
  AssignDeliveryHttpDTO,
  ArriveDeliveryHttpDTO,
  CompleteDeliveryHttpDTO,
  FailDeliveryHttpDTO,
  RescheduleDeliveryHttpDTO,
  CancelDeliveryHttpDTO,
  RefuseDeliveryHttpDTO,
  ListDeliveriesHttpQueryDTO,
} from '../../dtos/requests/delivery/delivery.request.dto.js';
import type {
  DeliveryHttpResponseDTO,
  DeliveryListHttpResponseDTO,
  DeliveryStatsHttpResponseDTO,
  DeliveryInitiateHttpResponseDTO,
} from '../../dtos/responses/delivery/delivery.response.dto.js';

import { DeliveryControllerMapper } from '../../mappers/delivery.controller.mapper.js';
import { DeliveryHttpValidator } from '../../validators/delivery.validator.js';
import { DeliveryLoggingInterceptor } from '../../interceptors/delivery-logging.interceptor.js';
import { DeliveryTimeoutInterceptor } from '../../interceptors/delivery-timeout.interceptor.js';
import {
  ApiCreateDelivery,
  ApiGetDelivery,
  ApiListDeliveries,
  ApiGetDeliveryStats,
  ApiDeliveryTransition,
  ApiDeliveryTag,
} from '../../swagger/delivery.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiDeliveryTag()
@ApiBearerAuth('bearer')
@Controller('deliveries')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DeliveryLoggingInterceptor, DeliveryTimeoutInterceptor)
export class DeliveryController extends BaseController {
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
  @ApiCreateDelivery()
  async create(
    @Body() body: CreateDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryInitiateHttpResponseDTO> {
    DeliveryHttpValidator.validateCreate(body);
    const appDto = DeliveryControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateDeliveryCommand,
      { readonly id: string; readonly shipmentId: string; readonly status: string }
    >(new CreateDeliveryCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      deliveryId: result.id,
      shipmentId: result.shipmentId,
      status: result.status,
    };
  }

  // ═══ State transitions ═══
  @Post(':id/schedule')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('schedule')
  async schedule(
    @Param('id') id: string,
    @Body() body: ScheduleDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateSchedule({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toScheduleAppDto(id, body);
    const result = await this.commandBus.execute<
      ScheduleDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new ScheduleDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('assign')
  async assign(
    @Param('id') id: string,
    @Body() body: AssignDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateAssign({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toAssignAppDto(id, body);
    const result = await this.commandBus.execute<
      AssignDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new AssignDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/arrive')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('arrive')
  async arrive(
    @Param('id') id: string,
    @Body() body: ArriveDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    const appDto = DeliveryControllerMapper.toArriveAppDto(id, body);
    const result = await this.commandBus.execute<
      ArriveDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new ArriveDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('complete')
  async complete(
    @Param('id') id: string,
    @Body() body: CompleteDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateComplete({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toCompleteAppDto(id, body);
    const result = await this.commandBus.execute<
      CompleteDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new CompleteDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/fail')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('fail')
  async fail(
    @Param('id') id: string,
    @Body() body: FailDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateFail({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toFailAppDto(id, body);
    const result = await this.commandBus.execute<
      FailDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new FailDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/refuse')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('refuse')
  async refuse(
    @Param('id') id: string,
    @Body() body: RefuseDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateRefuse({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toRefuseAppDto(id, body);
    const result = await this.commandBus.execute<
      RefuseDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new RefuseDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/reschedule')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('reschedule')
  async reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    DeliveryHttpValidator.validateReschedule({ deliveryId: id, ...body });
    const appDto = DeliveryControllerMapper.toRescheduleAppDto(id, body);
    const result = await this.commandBus.execute<
      RescheduleDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new RescheduleDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiDeliveryTransition('cancel')
  async cancel(
    @Param('id') id: string,
    @Body() body: CancelDeliveryHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DeliveryHttpResponseDTO> {
    const appDto = DeliveryControllerMapper.toCancelAppDto(id, body);
    const result = await this.commandBus.execute<
      CancelDeliveryCommand,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new CancelDeliveryCommand(appDto as never, this.getActorId(user)));
    return DeliveryControllerMapper.toHttpResponse(result);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetDeliveryStats()
  async getStats(): Promise<DeliveryStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetDeliveryStatsQuery,
      Parameters<typeof DeliveryControllerMapper.toStatsHttp>[0]
    >(new GetDeliveryStatsQuery());
    return DeliveryControllerMapper.toStatsHttp(appDto);
  }

  @Get(':id')
  @ApiGetDelivery()
  async getById(@Param('id') id: string): Promise<DeliveryHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetDeliveryQuery,
      Parameters<typeof DeliveryControllerMapper.toHttpResponse>[0]
    >(new GetDeliveryQuery(id));
    return DeliveryControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListDeliveries()
  async list(@Query() query: ListDeliveriesHttpQueryDTO): Promise<DeliveryListHttpResponseDTO> {
    const options = DeliveryControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<
      ListDeliveriesQuery,
      Parameters<typeof DeliveryControllerMapper.toListHttp>[0]
    >(new ListDeliveriesQuery(options as never));
    return DeliveryControllerMapper.toListHttp(appDto);
  }
}
