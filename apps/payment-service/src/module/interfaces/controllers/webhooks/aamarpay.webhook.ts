/**
 * AamarpayWebhookController
 * @module payment-service/interfaces/controllers/webhooks
 *
 * No dedicated HandleAamarpayWebhookCommand — uses ConfirmPaymentCommand.
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { ConfirmPaymentCommand } from '@application/commands/payment/confirm-payment.command';
import type { AamarpayWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/aamarpay')
export class AamarpayWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'aamarPay webhook endpoint' })
  async handle(
    @Body() body: AamarpayWebhookHttpDTO,
  ): Promise<{ readonly acknowledged: true }> {
    const isSuccess =
      body.pay_status === 'Successful' ||
      body.pay_status === 'Success' ||
      body.status_code === '2';

    if (isSuccess) {
      await this.commandBus.execute(
        new ConfirmPaymentCommand({
          paymentId: body.mer_txnid,
          gatewayReference: body.pg_txnid,
          confirmedAmount: Number(body.amount),
        }),
      );
    }
    return { acknowledged: true };
  }
}
