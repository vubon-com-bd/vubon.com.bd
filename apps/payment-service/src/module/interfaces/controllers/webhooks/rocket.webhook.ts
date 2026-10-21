/**
 * RocketWebhookController
 * @module payment-service/interfaces/controllers/webhooks
 *
 * No dedicated HandleRocketWebhookCommand — uses ConfirmPaymentCommand.
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
import type { RocketWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/rocket')
export class RocketWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rocket webhook endpoint' })
  async handle(
    @Body() body: RocketWebhookHttpDTO,
  ): Promise<{ readonly acknowledged: true }> {
    if (body.status === 'Success' || body.status === 'Paid') {
      await this.commandBus.execute(
        new ConfirmPaymentCommand({
          paymentId: body.orderId,
          gatewayReference: body.rocketPaymentId,
          confirmedAmount: Number(body.amount),
        }),
      );
    }
    return { acknowledged: true };
  }
}
