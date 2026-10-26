/**
 * SendGrid Webhook Controller — inbound delivery events
 * @module notification-service/interfaces/controllers/webhooks
 *
 * Receives event batches from SendGrid.
 * Verifies signature via WebhookSignatureGuard, then dispatches.
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
import { HandleSendgridWebhookCommand } from '@application/commands/provider-webhook/handle-sendgrid-webhook.command.js';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

interface SendgridEvent {
  readonly email: string;
  readonly timestamp: number;
  readonly event: string;
  readonly sg_event_id: string;
  readonly sg_message_id: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class SendgridWebhookController {
  private readonly logger = new Logger(SendgridWebhookController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('sendgrid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(@Body() events: SendgridEvent[]): Promise<{ readonly received: number }> {
    this.logger.log(`📨 SendGrid webhook received: ${events.length} events`);

    const result = await this.commandBus.execute<{
      processed: number;
      skipped: number;
      failed: number;
    }>(
      new HandleSendgridWebhookCommand({
        events: events as never,
      }) as never,
    );

    return { received: events.length };
  }
}
