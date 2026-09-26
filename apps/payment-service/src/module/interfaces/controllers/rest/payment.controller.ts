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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { InitiatePaymentCommand } from '../../../application/commands/payment/initiate-payment.command';
import { ConfirmPaymentCommand } from '../../../application/commands/payment/confirm-payment.command';
import { CancelPaymentCommand } from '../../../application/commands/payment/cancel-payment.command';
import { VerifyPaymentCommand } from '../../../application/commands/payment/verify-payment.command';
import { RetryPaymentCommand } from '../../../application/commands/payment/retry-payment.command';
import { GetPaymentQuery } from '../../../application/queries/payment/get-payment.query';
import { ListPaymentsQuery } from '../../../application/queries/payment/list-payments.query';
import { GetPaymentByOrderQuery } from '../../../application/queries/payment/get-payment-by-order.query';
import {
  InitiatePaymentRequestDto,
  ConfirmPaymentRequestDto,
  CancelPaymentRequestDto,
  VerifyPaymentRequestDto,
  RetryPaymentRequestDto,
} from '../../dtos/requests/payment.request.dto';
import { PaymentSwagger } from '../../swagger/payment.swagger';

@PaymentSwagger.Tag()
@PaymentSwagger.Auth()
@Controller('v1/payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @PaymentSwagger.Initiate()
  async initiate(@Body() body: InitiatePaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new InitiatePaymentCommand(
        body.orderId,
        '',
        body.method,
        body.amount,
        body.currency,
        body.gateway,
        body.returnUrl,
        body.idempotencyKey,
        body.metadata,
      ),
    );
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() body: ConfirmPaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ConfirmPaymentCommand(body.paymentId, body.idempotencyKey),
    );
  }

  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Body() body: CancelPaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CancelPaymentCommand(body.paymentId, body.reason),
    );
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() body: VerifyPaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new VerifyPaymentCommand(
        body.paymentId,
        body.gatewaySignature,
        body.gatewayData,
      ),
    );
  }

  @Post('retry')
  @HttpCode(HttpStatus.OK)
  async retry(@Body() body: RetryPaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RetryPaymentCommand(body.paymentId, body.idempotencyKey),
    );
  }

  @Get()
  @PaymentSwagger.List()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListPaymentsQuery(p, l));
  }

  @Get('order/:orderId')
  async getByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentByOrderQuery(orderId));
  }

  @Get(':id')
  @PaymentSwagger.Get()
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentQuery(id));
  }
}
