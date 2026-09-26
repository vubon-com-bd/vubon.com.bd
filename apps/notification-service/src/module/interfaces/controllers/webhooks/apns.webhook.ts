import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HandleApnsWebhookCommand } from '../../../application/commands/provider-webhook/handle-apns-webhook.command';

interface ApnsWebhookBody {
  apnsId: string;
  deviceToken: string;
  status: string;
  reason?: string;
}

@Controller('webhooks/apns')
export class ApnsWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: ApnsWebhookBody): Promise<{ ok: boolean }> {
    await this.commandBus.execute(
      new HandleApnsWebhookCommand(
        body.apnsId,
        body.deviceToken,
        body.status,
        body.reason,
      ),
    );
    return { ok: true };
  }
}
