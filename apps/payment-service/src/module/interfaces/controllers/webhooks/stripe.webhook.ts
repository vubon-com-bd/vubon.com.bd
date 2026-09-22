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
import { HandleStripeWebhookCommand } from '../../../application/commands/webhook/handle-stripe-webhook.command';

interface StripeBody {
  readonly id: string;
  readonly type: string;
  readonly data: { readonly object: Record<string, unknown> };
}

@Controller('v1/webhooks/stripe')
export class StripeWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @WebhookSignature({ gateway: 'stripe', header: 'stripe-signature' })
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() body: StripeBody,
    @Headers('stripe-signature') signature: string,
  ): Promise<{ ok: true }> {
    await this.commandBus.execute(
      new HandleStripeWebhookCommand(
        body.id,
        body.type,
        body.data.object,
        signature,
      ),
    );
    return { ok: true };
  }
}
