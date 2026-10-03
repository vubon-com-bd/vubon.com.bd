/**
 * ReturnController
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

import { RequestReturnCommand } from '../../../application/commands/return/request-return.command.js';
import { ApproveReturnCommand } from '../../../application/commands/return/approve-return.command.js';
import { RejectReturnCommand } from '../../../application/commands/return/reject-return.command.js';
import { CompleteReturnCommand } from '../../../application/commands/return/complete-return.command.js';
import { GetReturnQuery } from '../../../application/queries/return/get-return.query.js';
import { ListReturnsQuery } from '../../../application/queries/return/list-returns.query.js';

import type { ReturnResponseDTO } from '../../../application/dtos/responses/return-response.dto.js';
import type {
  RequestReturnRequestDTO,
  ApproveReturnRequestDTO,
  RejectReturnRequestDTO,
  CompleteReturnRequestDTO,
} from '../../../application/dtos/requests/return/index.js';

@ApiTags('order-returns')
@ApiBearerAuth('bearer')
@Controller('order-returns')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReturnController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request an order return' })
  async request(
    @Body() dto: RequestReturnRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnResponseDTO> {
    return this.commandBus.execute(new RequestReturnCommand(dto, user.userId));
  }

  @Get(':returnId')
  @ApiOperation({ summary: 'Get return by ID' })
  async getById(@Param('returnId') returnId: string): Promise<ReturnResponseDTO> {
    return this.queryBus.execute(new GetReturnQuery(returnId));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List returns by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<readonly ReturnResponseDTO[]> {
    return this.queryBus.execute(new ListReturnsQuery(orderId));
  }

  @Post(':returnId/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve return' })
  @Roles('admin', 'super_admin')
  async approve(
    @Param('returnId') returnId: string,
    @Body() body: { orderId: string; notes?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnResponseDTO> {
    const dto: ApproveReturnRequestDTO = { ...body, returnId };
    return this.commandBus.execute(new ApproveReturnCommand(dto, user.userId));
  }

  @Post(':returnId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject return' })
  @Roles('admin', 'super_admin')
  async reject(
    @Param('returnId') returnId: string,
    @Body() body: { orderId: string; reason: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnResponseDTO> {
    const dto: RejectReturnRequestDTO = { ...body, returnId };
    return this.commandBus.execute(new RejectReturnCommand(dto, user.userId));
  }

  @Post(':returnId/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete return (refund)' })
  @Roles('admin', 'super_admin')
  async complete(
    @Param('returnId') returnId: string,
    @Body() body: { orderId: string; refundAmount: number; restockFee?: number; notes?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReturnResponseDTO> {
    const dto: CompleteReturnRequestDTO = { ...body, returnId };
    return this.commandBus.execute(new CompleteReturnCommand(dto, user.userId));
  }
}
