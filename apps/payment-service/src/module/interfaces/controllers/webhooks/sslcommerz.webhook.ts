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
import { HandleSslcommerzWebhookCommand } from '../../../application/commands/webhook/handle-sslcommerz-webhook.command';

interface SslcommerzBody {
  readonly tran_id: string;
  readonly val_id: string;
  readonly amount: string;
  readonly status: string;
  readonly verify_sign: string;
}

@Controller('v1/webhooks/sslcommerz')
export class SslcommerzWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @WebhookSignature({ gateway: 'sslcommerz', header: 'verify_sign' })
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() body: SslcommerzBody,
    @Headers('verify_sign') signature: string,
  ): Promise<{ ok: true }> {
    await this.commandBus.execute(
      new HandleSslcommerzWebhookCommand(
        body.tran_id,
        body.val_id,
        body.amount,
        body.status,
        body.verify_sign,
        body as unknown as Record<string, unknown>,
      ),
    );
    return { ok: true };
  }
}
