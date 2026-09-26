import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HandleTwilioWebhookCommand } from '../../../application/commands/provider-webhook/handle-twilio-webhook.command';

interface TwilioWebhookBody {
  MessageSid: string;
  MessageStatus: string;
  To: string;
  ErrorCode?: string;
}

@Controller('webhooks/twilio')
export class TwilioWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: TwilioWebhookBody): Promise<{ ok: boolean }> {
    await this.commandBus.execute(
      new HandleTwilioWebhookCommand(
        body.MessageSid,
        body.MessageStatus,
        body.To,
        body.ErrorCode,
      ),
    );
    return { ok: true };
  }
}
