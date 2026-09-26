import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  HandleSendGridWebhookCommand,
  type SendGridEvent,
} from '../../../application/commands/provider-webhook/handle-sendgrid-webhook.command';

@Controller('webhooks/sendgrid')
export class SendGridWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: readonly SendGridEvent[]): Promise<{ ok: boolean }> {
    await this.commandBus.execute(new HandleSendGridWebhookCommand(body));
    return { ok: true };
  }
}
