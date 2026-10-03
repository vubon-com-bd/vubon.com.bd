/**
 * CancelController
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

import { RequestCancelCommand } from '../../../application/commands/cancel/request-cancel.command.js';
import { ApproveCancelCommand } from '../../../application/commands/cancel/approve-cancel.command.js';
import { RejectCancelCommand } from '../../../application/commands/cancel/reject-cancel.command.js';
import { GetCancelQuery } from '../../../application/queries/cancel/get-cancel.query.js';
import { ListCancelsQuery } from '../../../application/queries/cancel/list-cancels.query.js';

import type { CancelResponseDTO } from '../../../application/dtos/responses/cancel-response.dto.js';
import type {
  RequestCancelRequestDTO,
  ApproveCancelRequestDTO,
  RejectCancelRequestDTO,
} from '../../../application/dtos/requests/cancel/index.js';

@ApiTags('order-cancels')
@ApiBearerAuth('bearer')
@Controller('order-cancels')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CancelController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request order cancellation' })
  async request(
    @Body() dto: RequestCancelRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CancelResponseDTO> {
    return this.commandBus.execute(new RequestCancelCommand(dto, user.userId));
  }

  @Get(':cancelId')
  @ApiOperation({ summary: 'Get cancel by ID' })
  async getById(@Param('cancelId') cancelId: string): Promise<CancelResponseDTO> {
    return this.queryBus.execute(new GetCancelQuery(cancelId));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List cancels by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<readonly CancelResponseDTO[]> {
    return this.queryBus.execute(new ListCancelsQuery(orderId));
  }

  @Post(':cancelId/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve cancel' })
  @Roles('admin', 'super_admin')
  async approve(
    @Param('cancelId') cancelId: string,
    @Body() body: { orderId: string; refundAmount?: number; notes?: string; restockInventory?: boolean },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CancelResponseDTO> {
    const dto: ApproveCancelRequestDTO = { ...body, cancelId };
    return this.commandBus.execute(new ApproveCancelCommand(dto, user.userId));
  }

  @Post(':cancelId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject cancel' })
  @Roles('admin', 'super_admin')
  async reject(
    @Param('cancelId') cancelId: string,
    @Body() body: { orderId: string; reason: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CancelResponseDTO> {
    const dto: RejectCancelRequestDTO = { ...body, cancelId };
    return this.commandBus.execute(new RejectCancelCommand(dto, user.userId));
  }
}
