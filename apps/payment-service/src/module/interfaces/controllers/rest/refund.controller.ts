/**
 * RefundController — REST endpoints for refunds
 * @module payment-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RequestRefundCommand } from '../../../application/commands/refund/request-refund.command.js';
import { ApproveRefundCommand } from '../../../application/commands/refund/approve-refund.command.js';
import { ProcessRefundCommand } from '../../../application/commands/refund/process-refund.command.js';
import { CompleteRefundCommand } from '../../../application/commands/refund/complete-refund.command.js';
import { FailRefundCommand } from '../../../application/commands/refund/fail-refund.command.js';
import { CancelRefundCommand } from '../../../application/commands/refund/cancel-refund.command.js';

import { GetRefundQuery } from '../../../application/queries/refund/get-refund.query.js';
import { GetRefundPublicQuery } from '../../../application/queries/refund/get-refund-public.query.js';
import { ListRefundsQuery } from '../../../application/queries/refund/list-refunds.query.js';
import { ListRefundsByPaymentQuery } from '../../../application/queries/refund/list-refunds-by-payment.query.js';

import {
  RequestRefundHttpDTO,
  ApproveRefundHttpDTO,
  ProcessRefundHttpDTO,
  CompleteRefundHttpDTO,
  FailRefundHttpDTO,
  CancelRefundHttpDTO,
  ListRefundsHttpQueryDTO,
} from '../../dtos/requests/refund.request.dto.js';
import { RefundControllerMapper } from '../../mappers/refund.controller.mapper.js';

@ApiTags('refunds')
@ApiBearerAuth('bearer')
@Controller('refunds')
@UseGuards(JwtAuthGuard)
export class RefundController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request a refund for a payment' })
  async request(
    @Body() dto: RequestRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = RefundControllerMapper.toRequestAppDto(dto);
    return this.commandBus.execute(new RequestRefundCommand(appDto, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List refunds (paginated)' })
  async list(@Query() q: ListRefundsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListRefundsQuery({
        page: q.page ?? 1,
        limit: q.limit ?? 20,
        paymentId: q.paymentId,
        orderId: q.orderId,
        status: q.status,
        fromDate: q.fromDate,
        toDate: q.toDate,
      }),
    );
  }

  @Get('payment/:paymentId')
  @ApiOperation({ summary: 'List refunds for a payment' })
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListRefundsByPaymentQuery(paymentId));
  }

  @Get(':refundId')
  @ApiOperation({ summary: 'Get refund by id' })
  async getById(@Param('refundId') refundId: string): Promise<unknown> {
    return this.queryBus.execute(new GetRefundQuery(refundId));
  }

  @Get(':refundId/public')
  @ApiOperation({ summary: 'Get public refund view' })
  async getPublic(@Param('refundId') refundId: string): Promise<unknown> {
    return this.queryBus.execute(new GetRefundPublicQuery(refundId));
  }

  @Post(':refundId/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve a refund' })
  async approve(
    @Param('refundId') refundId: string,
    @Body() body: ApproveRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ApproveRefundCommand({ refundId, approvedBy: body.approvedBy ?? user.userId }, user.userId),
    );
  }

  @Post(':refundId/process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start processing a refund' })
  async process(
    @Param('refundId') refundId: string,
    @Body() body: ProcessRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ProcessRefundCommand({ refundId, gatewayRefundId: body.gatewayRefundId }, user.userId),
    );
  }

  @Post(':refundId/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete a refund (mark succeeded)' })
  async complete(
    @Param('refundId') refundId: string,
    @Body() body: CompleteRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CompleteRefundCommand({ refundId, gatewayRefundId: body.gatewayRefundId }, user.userId),
    );
  }

  @Post(':refundId/fail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark a refund as failed' })
  async fail(
    @Param('refundId') refundId: string,
    @Body() body: FailRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new FailRefundCommand({ refundId, reason: body.reason, code: body.code }, user.userId),
    );
  }

  @Post(':refundId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a refund' })
  async cancel(
    @Param('refundId') refundId: string,
    @Body() body: CancelRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelRefundCommand({ refundId, reason: body.reason }, user.userId),
    );
  }
}
