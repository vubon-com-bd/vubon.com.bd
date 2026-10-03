/**
 * TrackingController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Public, Roles } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddTrackingCommand } from '../../../application/commands/tracking/add-tracking.command.js';
import { UpdateTrackingCommand } from '../../../application/commands/tracking/update-tracking.command.js';
import { GetTrackingQuery } from '../../../application/queries/tracking/get-tracking.query.js';
import { ListTrackingEventsQuery } from '../../../application/queries/tracking/list-tracking-events.query.js';
import { GetTrackingSummaryQuery } from '../../../application/queries/tracking/get-tracking-summary.query.js';

import type {
  TrackingResponseDTO,
  TrackingSummaryResponseDTO,
} from '../../../application/dtos/responses/tracking-response.dto.js';
import type {
  AddTrackingRequestDTO,
  UpdateTrackingRequestDTO,
} from '../../../application/dtos/requests/tracking/index.js';

@ApiTags('order-tracking')
@ApiBearerAuth('bearer')
@Controller('order-tracking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrackingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a tracking event' })
  @Roles('admin', 'super_admin', 'vendor', 'logistics_manager', 'logistics_agent')
  async add(
    @Body() dto: AddTrackingRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TrackingResponseDTO> {
    return this.commandBus.execute(new AddTrackingCommand(dto, user.userId));
  }

  @Get(':trackingId')
  @ApiOperation({ summary: 'Get tracking entry by ID' })
  async getById(@Param('trackingId') trackingId: string): Promise<TrackingResponseDTO> {
    return this.queryBus.execute(new GetTrackingQuery(trackingId));
  }

  @Public()
  @Get('order/:orderId/events')
  @ApiOperation({ summary: 'List tracking events for an order (public)' })
  async listEvents(@Param('orderId') orderId: string): Promise<readonly TrackingResponseDTO[]> {
    return this.queryBus.execute(new ListTrackingEventsQuery(orderId));
  }

  @Public()
  @Get('order/:orderId/summary')
  @ApiOperation({ summary: 'Get tracking summary (public)' })
  async summary(@Param('orderId') orderId: string): Promise<TrackingSummaryResponseDTO> {
    return this.queryBus.execute(new GetTrackingSummaryQuery(orderId));
  }

  @Post(':trackingId/update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update tracking event' })
  @Roles('admin', 'super_admin', 'vendor', 'logistics_manager', 'logistics_agent')
  async update(
    @Param('trackingId') trackingId: string,
    @Body() dto: Omit<UpdateTrackingRequestDTO, 'trackingId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TrackingResponseDTO> {
    return this.commandBus.execute(
      new UpdateTrackingCommand({ ...dto, trackingId } as UpdateTrackingRequestDTO, user.userId),
    );
  }
}
