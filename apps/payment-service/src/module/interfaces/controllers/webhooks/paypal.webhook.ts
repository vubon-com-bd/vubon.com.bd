/**
 * PaypalWebhookController
 * @module payment-service/interfaces/controllers/webhooks
 *
 * No dedicated HandlePaypalWebhookCommand — uses ConfirmPaymentCommand.
 */
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { ConfirmPaymentCommand } from '@application/commands/payment/confirm-payment.command';
import type { PaypalWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/paypal')
export class PaypalWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'PayPal webhook endpoint' })
  async handle(
    @Body() body: PaypalWebhookHttpDTO,
    @Headers() headers: Record<string, string | string[] | undefined>,
  ): Promise<{ readonly received: true }> {
    void headers;

    if (
      body.event_type === 'PAYMENT.CAPTURE.COMPLETED' ||
      body.event_type === 'CHECKOUT.ORDER.APPROVED'
    ) {
      const resource = body.resource as {
        id?: string;
        custom_id?: string;
        paymentId?: string;
        amount?: { value?: string; currency_code?: string };
      };

      const paymentId = resource?.custom_id ?? resource?.paymentId;
      if (paymentId) {
        await this.commandBus.execute(
          new ConfirmPaymentCommand({
            paymentId,
            gatewayReference: resource?.id,
            confirmedAmount: resource?.amount?.value
              ? Number(resource.amount.value)
              : undefined,
            currency: resource?.amount?.currency_code,
          }),
        );
      }
    }

    return { received: true };
  }
}
