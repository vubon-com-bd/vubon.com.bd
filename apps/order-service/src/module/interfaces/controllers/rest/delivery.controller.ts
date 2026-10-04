/**
 * DeliveryController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { ScheduleDeliveryCommand } from '../../../application/commands/delivery/schedule-delivery.command.js';
import { RescheduleDeliveryCommand } from '../../../application/commands/delivery/reschedule-delivery.command.js';
import { ConfirmDeliveryCommand } from '../../../application/commands/delivery/confirm-delivery.command.js';
import { GetDeliveryQuery } from '../../../application/queries/delivery/get-delivery.query.js';
import { ListDeliveriesQuery } from '../../../application/queries/delivery/list-deliveries.query.js';
import { GetDeliveryMethodsQuery } from '../../../application/queries/delivery/get-delivery-methods.query.js';

import type { DeliveryResponseDTO, DeliveryMethodResponseDTO } from '../../../application/dtos/responses/delivery-response.dto.js';
import type {
  ScheduleDeliveryRequestDTO,
  RescheduleDeliveryRequestDTO,
  ConfirmDeliveryRequestDTO,
} from '../../../application/dtos/requests/delivery/index.js';

@ApiTags('deliveries')
@ApiBearerAuth('bearer')
@Controller('deliveries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliveryController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule a delivery' })
  async schedule(
    @Body() dto: ScheduleDeliveryRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new ScheduleDeliveryCommand(dto, user.userId));
  }

  @Get('methods')
  @ApiOperation({ summary: 'List delivery methods' })
  async methods(@Query('onlyActive') onlyActive = 'true'): Promise<readonly DeliveryMethodResponseDTO[]> {
    return this.queryBus.execute(new GetDeliveryMethodsQuery(onlyActive === 'true'));
  }

  @Get(':deliveryId')
  @ApiOperation({ summary: 'Get delivery by ID' })
  async getById(@Param('deliveryId') deliveryId: string): Promise<DeliveryResponseDTO> {
    return this.queryBus.execute(new GetDeliveryQuery(deliveryId));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List deliveries by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<readonly DeliveryResponseDTO[]> {
    return this.queryBus.execute(new ListDeliveriesQuery(orderId));
  }

  @Post(':deliveryId/reschedule')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reschedule a delivery' })
  async reschedule(
    @Param('deliveryId') deliveryId: string,
    @Body() dto: Omit<RescheduleDeliveryRequestDTO, 'deliveryId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(
      new RescheduleDeliveryCommand({ ...dto, deliveryId } as RescheduleDeliveryRequestDTO, user.userId),
    );
  }

  @Post(':deliveryId/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm delivery' })
  async confirm(
    @Param('deliveryId') deliveryId: string,
    @Body() body: { orderId: string; receivedBy?: string; signature?: string; notes?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<DeliveryResponseDTO> {
    const dto: ConfirmDeliveryRequestDTO = { ...body, deliveryId };
    return this.commandBus.execute(new ConfirmDeliveryCommand(dto, user.userId));
  }
}
