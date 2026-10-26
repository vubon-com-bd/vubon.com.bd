/**
 * Mailgun Webhook Controller
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
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

interface MailgunEvent {
  readonly event: string;
  readonly id: string;
  readonly recipient?: string;
  readonly timestamp?: number;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class MailgunWebhookController {
  private readonly logger = new Logger(MailgunWebhookController.name);

  @Post('mailgun')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() body: { 'event-data'?: MailgunEvent; signature?: unknown },
  ): Promise<{ readonly received: boolean }> {
    const event = body['event-data'];
    this.logger.log(`📨 Mailgun webhook: event=${event?.event ?? 'unknown'}`);
    return { received: true };
  }
}
