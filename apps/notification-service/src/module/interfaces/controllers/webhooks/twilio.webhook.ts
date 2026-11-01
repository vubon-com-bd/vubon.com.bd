/**
 * Twilio SMS Webhook Controller
 * @module notification-service/interfaces/controllers/webhooks
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { HandleTwilioWebhookCommand } from '@application/commands/provider-webhook/handle-twilio-webhook.command.js';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

interface TwilioPayload {
  readonly MessageSid: string;
  readonly AccountSid: string;
  readonly From: string;
  readonly To: string;
  readonly Status?: string;
  readonly ErrorCode?: string;
  readonly ErrorMessage?: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class TwilioWebhookController {
  private readonly logger = new Logger(TwilioWebhookController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('twilio')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() payload: TwilioPayload,
  ): Promise<{ readonly received: boolean }> {
    this.logger.log(
      `📨 Twilio webhook: sid=${payload.MessageSid} status=${payload.Status ?? 'unknown'}`,
    );

    await this.commandBus.execute(
      new HandleTwilioWebhookCommand({ payload: payload as never }) as never,
    );

    return { received: true };
  }
}
