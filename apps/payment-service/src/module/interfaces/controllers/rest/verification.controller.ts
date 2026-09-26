import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { VerifyPaymentCommand } from '../../../application/commands/payment/verify-payment.command';
import { GetVerificationQuery } from '../../../application/queries/verification/get-verification.query';

interface VerifyRequest {
  readonly paymentId: string;
  readonly gatewaySignature?: string;
  readonly gatewayData?: Record<string, unknown>;
}

@Controller('v1/payment-verifications')
@UseGuards(JwtAuthGuard)
export class VerificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async verify(@Body() body: VerifyRequest): Promise<unknown> {
    return this.commandBus.execute(
      new VerifyPaymentCommand(
        body.paymentId,
        body.gatewaySignature,
        body.gatewayData,
      ),
    );
  }

  @Get('payment/:paymentId')
  async getByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetVerificationQuery(paymentId));
  }
}
