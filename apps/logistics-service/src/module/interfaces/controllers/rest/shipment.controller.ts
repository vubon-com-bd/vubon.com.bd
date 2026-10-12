/**
 * ShipmentController — REST endpoints for shipment aggregate
 * @module logistics-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

// Commands
import { CreateShipmentCommand } from '../../../application/commands/shipment/create-shipment.command.js';
import { ConfirmShipmentCommand } from '../../../application/commands/shipment/confirm-shipment.command.js';
import { StartProcessingCommand } from '../../../application/commands/shipment/start-processing.command.js';
import { MarkPackedCommand } from '../../../application/commands/shipment/mark-packed.command.js';
import { GenerateLabelCommand } from '../../../application/commands/shipment/generate-label.command.js';
import { PickupShipmentCommand } from '../../../application/commands/shipment/pickup-shipment.command.js';
import { MarkInTransitCommand } from '../../../application/commands/shipment/mark-in-transit.command.js';
import { MarkOutForDeliveryCommand } from '../../../application/commands/shipment/mark-out-for-delivery.command.js';
import { DeliverShipmentCommand } from '../../../application/commands/shipment/deliver-shipment.command.js';
import { FailShipmentCommand } from '../../../application/commands/shipment/fail-shipment.command.js';
import { MarkReturnedCommand } from '../../../application/commands/shipment/mark-returned.command.js';
import { CancelShipmentCommand } from '../../../application/commands/shipment/cancel-shipment.command.js';
import { PutOnHoldCommand } from '../../../application/commands/shipment/put-on-hold.command.js';
import { ReleaseShipmentCommand } from '../../../application/commands/shipment/release-shipment.command.js';
import { MarkDelayedCommand } from '../../../application/commands/shipment/mark-delayed.command.js';
import { AssignCourierCommand } from '../../../application/commands/shipment/assign-courier.command.js';
import { AssignWarehouseCommand } from '../../../application/commands/shipment/assign-warehouse.command.js';
import { ChangePriorityCommand } from '../../../application/commands/shipment/change-priority.command.js';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command.js';

// Queries
import { GetShipmentByIdQuery } from '../../../application/queries/shipment/get-shipment-by-id.query.js';
import { GetShipmentByTrackingQuery } from '../../../application/queries/shipment/get-shipment-by-tracking.query.js';
import { ListShipmentsQuery } from '../../../application/queries/shipment/list-shipments.query.js';
import { ListShipmentsByOrderQuery } from '../../../application/queries/shipment/list-shipments-by-order.query.js';
import { GetShipmentStatsQuery } from '../../../application/queries/shipment/get-shipment-stats.query.js';
import { GetPublicShipmentQuery } from '../../../application/queries/shipment/get-public-shipment.query.js';

// HTTP DTOs
import {
  CreateShipmentHttpDTO, UpdateShipmentHttpDTO, CancelShipmentHttpDTO,
  PickupShipmentHttpDTO, DeliverShipmentHttpDTO, FailShipmentHttpDTO,
  MarkReturnedHttpDTO, AssignCourierHttpDTO, AssignWarehouseHttpDTO,
  PutOnHoldHttpDTO, MarkDelayedHttpDTO, ChangePriorityHttpDTO,
  GenerateLabelHttpDTO, ListShipmentsHttpQueryDTO,
} from '../../dtos/requests/shipment.request.dto.js';
import { ShipmentControllerMapper } from '../../mappers/shipment.controller.mapper.js';

// Response DTOs
import type {
  ShipmentResponseDTO, ShipmentPublicResponseDTO, ShipmentListResponseDTO,
  ShipmentStatsResponseDTO,
} from '../../../application/dtos/responses/shipment/shipment-response.dto.js';

@ApiTags('shipments')
@ApiBearerAuth('bearer')
@Controller('logistics/shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  // ═══ CREATE + UPDATE ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new shipment' })
  async create(
    @Body() dto: CreateShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    const appDto = ShipmentControllerMapper.toCreateDto(dto);
    return this.commandBus.execute(new CreateShipmentCommand(appDto, user.userId));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shipment notes' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new UpdateShipmentCommand(ShipmentControllerMapper.toUpdateDto(id, dto), user.userId),
    );
  }

  // ═══ LIFECYCLE TRANSITIONS ═══
  @Patch(':id/confirm')
  @ApiOperation({ summary: 'Confirm a shipment' })
  async confirm(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(new ConfirmShipmentCommand(id, user.userId));
  }

  @Patch(':id/process')
  @ApiOperation({ summary: 'Start processing a shipment' })
  async startProcessing(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(new StartProcessingCommand(id, user.userId));
  }

  @Patch(':id/pack')
  @ApiOperation({ summary: 'Mark shipment as packed' })
  async markPacked(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(new MarkPackedCommand(id, user.userId));
  }

  @Post(':id/label')
  @ApiOperation({ summary: 'Generate shipping label URL' })
  async generateLabel(
    @Param('id') id: string,
    @Body() dto: GenerateLabelHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new GenerateLabelCommand(ShipmentControllerMapper.toGenerateLabelDto(id, dto), user.userId),
    );
  }

  @Patch(':id/pickup')
  @ApiOperation({ summary: 'Mark shipment as picked up by courier' })
  async pickup(
    @Param('id') id: string,
    @Body() dto: PickupShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new PickupShipmentCommand(ShipmentControllerMapper.toPickupDto(id, dto), user.userId),
    );
  }

  @Patch(':id/in-transit')
  @ApiOperation({ summary: 'Mark shipment as in transit' })
  async markInTransit(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(new MarkInTransitCommand(id, user.userId));
  }

  @Patch(':id/out-for-delivery')
  @ApiOperation({ summary: 'Mark shipment as out for delivery' })
  async markOutForDelivery(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(new MarkOutForDeliveryCommand(id, user.userId));
  }

  @Patch(':id/deliver')
  @ApiOperation({ summary: 'Mark shipment as delivered' })
  async deliver(
    @Param('id') id: string,
    @Body() dto: DeliverShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new DeliverShipmentCommand(ShipmentControllerMapper.toDeliverDto(id, dto), user.userId),
    );
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: 'Mark shipment as failed' })
  async fail(
    @Param('id') id: string,
    @Body() dto: FailShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new FailShipmentCommand(ShipmentControllerMapper.toFailDto(id, dto), user.userId),
    );
  }

  @Patch(':id/return')
  @ApiOperation({ summary: 'Mark shipment as returned' })
  async markReturned(
    @Param('id') id: string,
    @Body() dto: MarkReturnedHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new MarkReturnedCommand(ShipmentControllerMapper.toMarkReturnedDto(id, dto), user.userId),
    );
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a shipment' })
  async cancel(
    @Param('id') id: string,
    @Body() dto: CancelShipmentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new CancelShipmentCommand(ShipmentControllerMapper.toCancelDto(id, dto), user.userId),
    );
  }

  @Patch(':id/hold')
  @ApiOperation({ summary: 'Put shipment on hold' })
  async putOnHold(
    @Param('id') id: string,
    @Body() dto: PutOnHoldHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new PutOnHoldCommand(ShipmentControllerMapper.toPutOnHoldDto(id, dto), user.userId),
    );
  }

  @Patch(':id/release')
  @ApiOperation({ summary: 'Release shipment from hold' })
  async release(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new ReleaseShipmentCommand(ShipmentControllerMapper.toReleaseDto(id), user.userId),
    );
  }

  @Patch(':id/delay')
  @ApiOperation({ summary: 'Mark shipment as delayed' })
  async markDelayed(
    @Param('id') id: string,
    @Body() dto: MarkDelayedHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new MarkDelayedCommand(ShipmentControllerMapper.toMarkDelayedDto(id, dto), user.userId),
    );
  }

  // ═══ ASSIGNMENT ═══
  @Patch(':id/courier')
  @ApiOperation({ summary: 'Assign a courier to the shipment' })
  async assignCourier(
    @Param('id') id: string,
    @Body() dto: AssignCourierHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new AssignCourierCommand(ShipmentControllerMapper.toAssignCourierDto(id, dto), user.userId),
    );
  }

  @Patch(':id/warehouse')
  @ApiOperation({ summary: 'Assign a warehouse to the shipment' })
  async assignWarehouse(
    @Param('id') id: string,
    @Body() dto: AssignWarehouseHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new AssignWarehouseCommand(ShipmentControllerMapper.toAssignWarehouseDto(id, dto), user.userId),
    );
  }

  @Patch(':id/priority')
  @ApiOperation({ summary: 'Change shipment priority' })
  async changePriority(
    @Param('id') id: string,
    @Body() dto: ChangePriorityHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ShipmentResponseDTO> {
    return this.commandBus.execute(
      new ChangePriorityCommand(ShipmentControllerMapper.toChangePriorityDto(id, dto), user.userId),
    );
  }

  // ═══ QUERIES ═══
  @Get()
  @ApiOperation({ summary: 'List shipments (paginated)' })
  async list(@Query() q: ListShipmentsHttpQueryDTO): Promise<ShipmentListResponseDTO> {
    return this.queryBus.execute(new ListShipmentsQuery(ShipmentControllerMapper.toListOptions(q)));
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get shipment statistics' })
  async getStats(
    @Query('userId') userId?: string,
    @Query('vendorId') vendorId?: string,
  ): Promise<ShipmentStatsResponseDTO> {
    return this.queryBus.execute(new GetShipmentStatsQuery(userId, vendorId));
  }

  @Get('by-tracking/:trackingNumber')
  @ApiOperation({ summary: 'Get shipment by tracking number' })
  async getByTracking(@Param('trackingNumber') trackingNumber: string): Promise<ShipmentResponseDTO> {
    return this.queryBus.execute(new GetShipmentByTrackingQuery(trackingNumber));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List shipments for an order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<readonly ShipmentResponseDTO[]> {
    return this.queryBus.execute(new ListShipmentsByOrderQuery(orderId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shipment by id' })
  async getById(@Param('id') id: string): Promise<ShipmentResponseDTO> {
    return this.queryBus.execute(new GetShipmentByIdQuery(id));
  }

  @Get(':id/public')
  @ApiOperation({ summary: 'Get public shipment view' })
  async getPublic(@Param('id') id: string): Promise<ShipmentPublicResponseDTO> {
    return this.queryBus.execute(new GetPublicShipmentQuery(id));
  }
}
