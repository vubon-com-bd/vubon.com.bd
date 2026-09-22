import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WebhookSignatureGuard } from '../../guards/webhook-signature.guard';
import { WebhookSignature } from '../../decorators/webhook-signature.decorator';
import { HandleBkashWebhookCommand } from '../../../application/commands/webhook/handle-bkash-webhook.command';

interface BkashBody {
  readonly paymentID: string;
  readonly trxID: string;
  readonly amount: string;
  readonly currency: string;
  readonly transactionStatus: string;
  readonly merchantInvoiceNumber: string;
}

@Controller('v1/webhooks/bkash')
export class BkashWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @WebhookSignature({ gateway: 'bkash' })
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() body: BkashBody,
    @Headers('x-webhook-signature') signature: string,
  ): Promise<{ ok: true }> {
    await this.commandBus.execute(
      new HandleBkashWebhookCommand(
        body.paymentID,
        body.trxID,
        body.amount,
        body.currency,
        body.transactionStatus,
        signature,
        body as unknown as Record<string, unknown>,
      ),
    );
    return { ok: true };
  }
}
