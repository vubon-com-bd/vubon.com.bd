/**
 * CryptoWebhookController
 * @module payment-service/interfaces/controllers/webhooks
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
import type { CryptoWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/crypto')
export class CryptoWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Crypto webhook endpoint' })
  async handle(
    @Body() body: CryptoWebhookHttpDTO,
  ): Promise<{ readonly acknowledged: true }> {
    const isConfirmed =
      body.status === 'confirmed' && (body.confirmations ?? 0) >= 3;
    if (isConfirmed) {
      // Requires mapping txHash → paymentId (out of scope for this controller)
    }
    void this.commandBus;
    void ConfirmPaymentCommand;
    return { acknowledged: true };
  }
}
