/**
 * FulfillmentController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Roles } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { StartFulfillmentCommand } from '../../../application/commands/fulfillment/start-fulfillment.command.js';
import { PackOrderCommand } from '../../../application/commands/fulfillment/pack-order.command.js';
import { ShipOrderCommand } from '../../../application/commands/fulfillment/ship-order.command.js';
import { CompleteFulfillmentCommand } from '../../../application/commands/fulfillment/complete-fulfillment.command.js';
import { GetFulfillmentQuery } from '../../../application/queries/fulfillment/get-fulfillment.query.js';
import { ListFulfillmentsQuery } from '../../../application/queries/fulfillment/list-fulfillments.query.js';

import type { FulfillmentResponseDTO } from '../../../application/dtos/responses/fulfillment-response.dto.js';
import type {
  StartFulfillmentRequestDTO,
  PackOrderRequestDTO,
  ShipOrderRequestDTO,
  CompleteFulfillmentRequestDTO,
} from '../../../application/dtos/requests/fulfillment/index.js';

@ApiTags('order-fulfillments')
@ApiBearerAuth('bearer')
@Controller('order-fulfillments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FulfillmentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start fulfillment' })
  @Roles('admin', 'super_admin', 'vendor', 'vendor_manager', 'warehouse_manager')
  async start(
    @Body() dto: StartFulfillmentRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new StartFulfillmentCommand(dto, user.userId));
  }

  @Get(':fulfillmentId')
  @ApiOperation({ summary: 'Get fulfillment by ID' })
  async getById(@Param('fulfillmentId') fulfillmentId: string): Promise<FulfillmentResponseDTO> {
    return this.queryBus.execute(new GetFulfillmentQuery(fulfillmentId));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List fulfillments by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<readonly FulfillmentResponseDTO[]> {
    return this.queryBus.execute(new ListFulfillmentsQuery(orderId));
  }

  @Post('pack')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pack order (mark packed)' })
  @Roles('admin', 'super_admin', 'vendor', 'vendor_manager', 'warehouse_manager')
  async pack(
    @Body() dto: PackOrderRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new PackOrderCommand(dto, user.userId));
  }

  @Post('ship')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ship order' })
  @Roles('admin', 'super_admin', 'vendor', 'vendor_manager', 'warehouse_manager')
  async ship(
    @Body() dto: ShipOrderRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new ShipOrderCommand(dto, user.userId));
  }

  @Post(':fulfillmentId/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete fulfillment' })
  @Roles('admin', 'super_admin', 'vendor', 'vendor_manager', 'warehouse_manager')
  async complete(
    @Param('fulfillmentId') fulfillmentId: string,
    @Body() body: { orderId: string; notes?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentResponseDTO> {
    const dto: CompleteFulfillmentRequestDTO = { ...body, fulfillmentId };
    return this.commandBus.execute(new CompleteFulfillmentCommand(dto, user.userId));
  }
}
