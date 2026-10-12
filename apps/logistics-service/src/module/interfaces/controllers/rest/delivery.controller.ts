import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ScheduleDeliveryCommand } from '../../../application/commands/delivery/schedule-delivery.command.js';
import { AssignDeliveryDriverCommand } from '../../../application/commands/delivery/assign-delivery-driver.command.js';
import { AddDeliveryAttemptCommand } from '../../../application/commands/delivery/add-delivery-attempt.command.js';
import { CompleteDeliveryCommand } from '../../../application/commands/delivery/complete-delivery.command.js';
import { FailDeliveryCommand } from '../../../application/commands/delivery/fail-delivery.command.js';
import { RescheduleDeliveryCommand } from '../../../application/commands/delivery/reschedule-delivery.command.js';
import { CancelDeliveryCommand } from '../../../application/commands/delivery/cancel-delivery.command.js';
import { GetDeliveryQuery } from '../../../application/queries/delivery/get-delivery.query.js';
import { GetDeliveryByShipmentQuery } from '../../../application/queries/delivery/get-delivery-by-shipment.query.js';
import { ListDeliveriesQuery } from '../../../application/queries/delivery/list-deliveries.query.js';
import {
  ScheduleDeliveryHttpDTO, AssignDeliveryDriverHttpDTO, AddDeliveryAttemptHttpDTO,
  CompleteDeliveryHttpDTO, FailDeliveryHttpDTO, RescheduleDeliveryHttpDTO,
  CancelDeliveryHttpDTO, ListDeliveriesHttpQueryDTO,
} from '../../dtos/requests/delivery.request.dto.js';
import { DeliveryControllerMapper } from '../../mappers/delivery.controller.mapper.js';
import type { DeliveryResponseDTO, DeliveryListResponseDTO } from '../../../application/dtos/responses/delivery/delivery-response.dto.js';

@ApiTags('deliveries')
@ApiBearerAuth('bearer')
@Controller('logistics/deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Schedule a new delivery' })
  async schedule(@Body() dto: ScheduleDeliveryHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new ScheduleDeliveryCommand(DeliveryControllerMapper.toScheduleDto(dto), user.userId));
  }
  @Patch(':id/driver') @ApiOperation({ summary: 'Assign a driver' })
  async assignDriver(@Param('id') id: string, @Body() dto: AssignDeliveryDriverHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new AssignDeliveryDriverCommand(DeliveryControllerMapper.toAssignDto(id, dto), user.userId));
  }
  @Post(':id/attempt') @ApiOperation({ summary: 'Record a delivery attempt' })
  async addAttempt(@Param('id') id: string, @Body() dto: AddDeliveryAttemptHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new AddDeliveryAttemptCommand(DeliveryControllerMapper.toAttemptDto(id, dto), user.userId));
  }
  @Post(':id/complete') @ApiOperation({ summary: 'Mark delivery as complete with proof' })
  async complete(@Param('id') id: string, @Body() dto: CompleteDeliveryHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new CompleteDeliveryCommand(DeliveryControllerMapper.toCompleteDto(id, dto), user.userId));
  }
  @Patch(':id/fail') @ApiOperation({ summary: 'Mark delivery as failed' })
  async fail(@Param('id') id: string, @Body() dto: FailDeliveryHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new FailDeliveryCommand(DeliveryControllerMapper.toFailDto(id, dto), user.userId));
  }
  @Patch(':id/reschedule') @ApiOperation({ summary: 'Reschedule delivery' })
  async reschedule(@Param('id') id: string, @Body() dto: RescheduleDeliveryHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new RescheduleDeliveryCommand(DeliveryControllerMapper.toRescheduleDto(id, dto), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel delivery' })
  async cancel(@Param('id') id: string, @Body() dto: CancelDeliveryHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DeliveryResponseDTO> {
    return this.commandBus.execute(new CancelDeliveryCommand(DeliveryControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List deliveries' })
  async list(@Query() q: ListDeliveriesHttpQueryDTO): Promise<DeliveryListResponseDTO> {
    return this.queryBus.execute(new ListDeliveriesQuery(DeliveryControllerMapper.toListOptions(q)));
  }
  @Get('by-shipment/:shipmentId') @ApiOperation({ summary: 'Get delivery by shipment id' })
  async getByShipment(@Param('shipmentId') shipmentId: string): Promise<DeliveryResponseDTO | null> {
    return this.queryBus.execute(new GetDeliveryByShipmentQuery(shipmentId));
  }
  @Get(':id') @ApiOperation({ summary: 'Get delivery by id' })
  async getById(@Param('id') id: string): Promise<DeliveryResponseDTO> {
    return this.queryBus.execute(new GetDeliveryQuery(id));
  }
}
