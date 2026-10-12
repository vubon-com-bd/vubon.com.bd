import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { RequestReturnCommand } from '../../../application/commands/return-shipment/request-return.command.js';
import { ApproveReturnCommand } from '../../../application/commands/return-shipment/approve-return.command.js';
import { RejectReturnCommand } from '../../../application/commands/return-shipment/reject-return.command.js';
import { ScheduleReturnPickupCommand } from '../../../application/commands/return-shipment/schedule-return-pickup.command.js';
import { PickupReturnCommand } from '../../../application/commands/return-shipment/pickup-return.command.js';
import { MarkReturnInTransitCommand } from '../../../application/commands/return-shipment/mark-return-in-transit.command.js';
import { ReceiveReturnCommand } from '../../../application/commands/return-shipment/receive-return.command.js';
import { InspectReturnCommand } from '../../../application/commands/return-shipment/inspect-return.command.js';
import { CompleteReturnCommand } from '../../../application/commands/return-shipment/complete-return.command.js';
import { IssueReturnRefundCommand } from '../../../application/commands/return-shipment/issue-return-refund.command.js';
import { CancelReturnCommand } from '../../../application/commands/return-shipment/cancel-return.command.js';
import { MarkReturnLostCommand } from '../../../application/commands/return-shipment/mark-return-lost.command.js';
import { GetReturnShipmentQuery } from '../../../application/queries/return-shipment/get-return-shipment.query.js';
import { GetReturnByRmaQuery } from '../../../application/queries/return-shipment/get-return-by-rma.query.js';
import { ListReturnShipmentsQuery } from '../../../application/queries/return-shipment/list-return-shipments.query.js';
import {
  RequestReturnHttpDTO, RejectReturnHttpDTO, ScheduleReturnPickupHttpDTO,
  PickupReturnHttpDTO, InspectReturnHttpDTO, IssueRefundHttpDTO,
  CancelReturnHttpDTO, ReturnReasonHttpDTO, ListReturnsHttpQueryDTO,
} from '../../dtos/requests/return-shipment.request.dto.js';
import { ReturnShipmentControllerMapper } from '../../mappers/return-shipment.controller.mapper.js';
import type { ReturnShipmentResponseDTO, ReturnShipmentListResponseDTO } from '../../../application/dtos/responses/return-shipment/return-shipment-response.dto.js';

@ApiTags('return-shipments')
@ApiBearerAuth('bearer')
@Controller('logistics/return-shipments')
@UseGuards(JwtAuthGuard)
export class ReturnShipmentController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Request a return' })
  async request(@Body() dto: RequestReturnHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new RequestReturnCommand(ReturnShipmentControllerMapper.toRequestDto(dto), user.userId));
  }
  @Patch(':id/approve') @ApiOperation({ summary: 'Approve return' })
  async approve(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new ApproveReturnCommand(ReturnShipmentControllerMapper.toApproveDto(id), user.userId));
  }
  @Patch(':id/reject') @ApiOperation({ summary: 'Reject return' })
  async reject(@Param('id') id: string, @Body() dto: RejectReturnHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new RejectReturnCommand(ReturnShipmentControllerMapper.toRejectDto(id, dto), user.userId));
  }
  @Patch(':id/schedule-pickup') @ApiOperation({ summary: 'Schedule return pickup' })
  async schedulePickup(@Param('id') id: string, @Body() dto: ScheduleReturnPickupHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new ScheduleReturnPickupCommand(ReturnShipmentControllerMapper.toSchedulePickupDto(id, dto), user.userId));
  }
  @Patch(':id/pickup') @ApiOperation({ summary: 'Mark return picked up' })
  async pickup(@Param('id') id: string, @Body() dto: PickupReturnHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new PickupReturnCommand(ReturnShipmentControllerMapper.toPickupDto(id, dto), user.userId));
  }
  @Patch(':id/in-transit') @ApiOperation({ summary: 'Mark return in transit' })
  async inTransit(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new MarkReturnInTransitCommand(ReturnShipmentControllerMapper.toInTransitDto(id), user.userId));
  }
  @Patch(':id/receive') @ApiOperation({ summary: 'Mark return received' })
  async receive(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new ReceiveReturnCommand(ReturnShipmentControllerMapper.toReceiveDto(id), user.userId));
  }
  @Patch(':id/inspect') @ApiOperation({ summary: 'Inspect return' })
  async inspect(@Param('id') id: string, @Body() dto: InspectReturnHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new InspectReturnCommand(ReturnShipmentControllerMapper.toInspectDto(id, dto), user.userId));
  }
  @Patch(':id/complete') @ApiOperation({ summary: 'Complete return' })
  async complete(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new CompleteReturnCommand(ReturnShipmentControllerMapper.toCompleteDto(id), user.userId));
  }
  @Post(':id/refund') @ApiOperation({ summary: 'Issue refund for return' })
  async refund(@Param('id') id: string, @Body() dto: IssueRefundHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new IssueReturnRefundCommand(ReturnShipmentControllerMapper.toIssueRefundDto(id, dto), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel return' })
  async cancel(@Param('id') id: string, @Body() dto: CancelReturnHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new CancelReturnCommand(ReturnShipmentControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Patch(':id/lost') @ApiOperation({ summary: 'Mark return as lost' })
  async markLost(@Param('id') id: string, @Body() dto: ReturnReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ReturnShipmentResponseDTO> {
    return this.commandBus.execute(new MarkReturnLostCommand(ReturnShipmentControllerMapper.toMarkLostDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List return shipments' })
  async list(@Query() q: ListReturnsHttpQueryDTO): Promise<ReturnShipmentListResponseDTO> {
    return this.queryBus.execute(new ListReturnShipmentsQuery(ReturnShipmentControllerMapper.toListOptions(q)));
  }
  @Get('by-rma/:rmaNumber') @ApiOperation({ summary: 'Get return by RMA number' })
  async getByRma(@Param('rmaNumber') rma: string): Promise<ReturnShipmentResponseDTO> {
    return this.queryBus.execute(new GetReturnByRmaQuery(rma));
  }
  @Get(':id') @ApiOperation({ summary: 'Get return by id' })
  async getById(@Param('id') id: string): Promise<ReturnShipmentResponseDTO> {
    return this.queryBus.execute(new GetReturnShipmentQuery(id));
  }
}
