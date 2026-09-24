import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HandleFcmWebhookCommand } from '../../../application/commands/provider-webhook/handle-fcm-webhook.command';

interface FcmWebhookBody {
  messageId: string;
  deviceToken: string;
  status: string;
  error?: string;
}

@Controller('webhooks/fcm')
export class FcmWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: FcmWebhookBody): Promise<{ ok: boolean }> {
    await this.commandBus.execute(
      new HandleFcmWebhookCommand(
        body.messageId,
        body.deviceToken,
        body.status,
        body.error,
      ),
    );
    return { ok: true };
  }
}
