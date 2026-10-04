/**
 * PaymentController — REST endpoints for payment aggregate
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

import { InitiatePaymentCommand } from '../../../application/commands/payment/initiate-payment.command.js';
import { VerifyPaymentCommand } from '../../../application/commands/payment/verify-payment.command.js';
import { CapturePaymentCommand } from '../../../application/commands/payment/capture-payment.command.js';
import { FailPaymentCommand } from '../../../application/commands/payment/fail-payment.command.js';
import { CancelPaymentCommand } from '../../../application/commands/payment/cancel-payment.command.js';
import { RetryPaymentCommand } from '../../../application/commands/payment/retry-payment.command.js';
import { MarkChargebackCommand } from '../../../application/commands/payment/mark-chargeback.command.js';
import { MarkPaidCommand } from '../../../application/commands/payment/mark-paid.command.js';

import { GetPaymentQuery } from '../../../application/queries/payment/get-payment.query.js';
import { GetPaymentDetailQuery } from '../../../application/queries/payment/get-payment-detail.query.js';
import { GetPaymentPublicQuery } from '../../../application/queries/payment/get-payment-public.query.js';
import { ListPaymentsQuery } from '../../../application/queries/payment/list-payments.query.js';
import { ListPaymentsByUserQuery } from '../../../application/queries/payment/list-payments-by-user.query.js';
import { ListPaymentsByOrderQuery } from '../../../application/queries/payment/list-payments-by-order.query.js';
import { GetPaymentStatsQuery } from '../../../application/queries/payment/get-payment-stats.query.js';

import {
  InitiatePaymentHttpDTO,
  VerifyPaymentHttpDTO,
  CapturePaymentHttpDTO,
  FailPaymentHttpDTO,
  CancelPaymentHttpDTO,
  RetryPaymentHttpDTO,
  MarkChargebackHttpDTO,
  ListPaymentsHttpQueryDTO,
} from '../../dtos/requests/payment.request.dto.js';
import { PaymentControllerMapper } from '../../mappers/payment.controller.mapper.js';

import type { PaymentInitiateResponseDTO } from '../../../application/dtos/responses/payment-response.dto.js';

@ApiTags('payments')
@ApiBearerAuth('bearer')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Initiate a payment' })
  async initiate(
    @Body() dto: InitiatePaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PaymentInitiateResponseDTO> {
    const appDto = PaymentControllerMapper.toInitiateAppDto(dto);
    return this.commandBus.execute(
      new InitiatePaymentCommand(appDto, user.userId, user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List payments (paginated)' })
  async list(@Query() q: ListPaymentsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListPaymentsQuery({
        page: q.page ?? 1,
        limit: q.limit ?? 20,
        filter: {
          orderId: q.orderId,
          userId: q.userId,
          status: q.status,
          gateway: q.gateway,
          currency: q.currency,
          fromDate: q.fromDate,
          toDate: q.toDate,
        },
      }),
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Payment statistics' })
  async stats(
    @Query('userId') userId?: string,
    @Query('gateway') gateway?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentStatsQuery(userId, gateway));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List payments by user' })
  async listByUser(
    @Param('userId') userId: string,
    @Query() q: ListPaymentsHttpQueryDTO,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListPaymentsByUserQuery(userId, {
        page: q.page ?? 1,
        limit: q.limit ?? 20,
      }),
    );
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List payments by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new ListPaymentsByOrderQuery(orderId));
  }

  @Get(':paymentId')
  @ApiOperation({ summary: 'Get payment by id' })
  async getById(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentQuery(paymentId));
  }

  @Get(':paymentId/detail')
  @ApiOperation({ summary: 'Get payment detail (with transactions)' })
  async getDetail(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentDetailQuery(paymentId));
  }

  @Get(':paymentId/public')
  @ApiOperation({ summary: 'Get public payment view' })
  async getPublic(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentPublicQuery(paymentId));
  }

  @Post(':paymentId/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify a payment' })
  async verify(
    @Param('paymentId') paymentId: string,
    @Body() body: { gatewaySignature?: string; gatewayData?: Record<string, unknown> },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: VerifyPaymentHttpDTO = {
      paymentId,
      gatewaySignature: body.gatewaySignature,
      gatewayData: body.gatewayData,
    };
    return this.commandBus.execute(new VerifyPaymentCommand(dto, user.userId));
  }

  @Post(':paymentId/capture')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Capture an authorized payment' })
  async capture(
    @Param('paymentId') paymentId: string,
    @Body() body: { amount?: number; idempotencyKey?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CapturePaymentHttpDTO = {
      amount: body.amount,
      idempotencyKey: body.idempotencyKey,
    };
    void paymentId;
    return this.commandBus.execute(new CapturePaymentCommand({ ...dto, paymentId }, user.userId));
  }

  @Post(':paymentId/fail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark payment failed' })
  async fail(
    @Param('paymentId') paymentId: string,
    @Body() body: FailPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new FailPaymentCommand({ paymentId, reason: body.reason, code: body.code }, user.userId),
    );
  }

  @Post(':paymentId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel payment' })
  async cancel(
    @Param('paymentId') paymentId: string,
    @Body() body: CancelPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelPaymentCommand({ paymentId, reason: body.reason }, user.userId),
    );
  }

  @Post(':paymentId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a failed payment' })
  async retry(
    @Param('paymentId') paymentId: string,
    @Body() body: RetryPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RetryPaymentCommand({ paymentId, idempotencyKey: body.idempotencyKey }, user.userId),
    );
  }

  @Post(':paymentId/chargeback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark payment chargeback' })
  async chargeback(
    @Param('paymentId') paymentId: string,
    @Body() body: MarkChargebackHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MarkChargebackCommand({ paymentId, amount: body.amount, reason: body.reason }, user.userId),
    );
  }

  @Post(':paymentId/mark-paid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark payment as paid (admin/webhook)' })
  async markPaid(
    @Param('paymentId') paymentId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new MarkPaidCommand(paymentId, user.userId));
  }
}
