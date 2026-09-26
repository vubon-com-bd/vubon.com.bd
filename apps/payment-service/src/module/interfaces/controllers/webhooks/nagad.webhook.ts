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
import { HandleNagadWebhookCommand } from '../../../application/commands/webhook/handle-nagad-webhook.command';

interface NagadBody {
  readonly paymentRefId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly status: string;
}

@Controller('v1/webhooks/nagad')
export class NagadWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @WebhookSignature({ gateway: 'nagad' })
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() body: NagadBody,
    @Headers('x-webhook-signature') signature: string,
  ): Promise<{ ok: true }> {
    await this.commandBus.execute(
      new HandleNagadWebhookCommand(
        body.paymentRefId,
        body.orderId,
        body.amount,
        body.status,
        signature,
        body as unknown as Record<string, unknown>,
      ),
    );
    return { ok: true };
  }
}
