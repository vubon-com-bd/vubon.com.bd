/**
 * Firebase Cloud Messaging Webhook Controller
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
import { HandleFcmWebhookCommand } from '@application/commands/provider-webhook/handle-fcm-webhook.command.js';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

interface FcmPayload {
  readonly messageId: string;
  readonly state: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class FcmWebhookController {
  private readonly logger = new Logger(FcmWebhookController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('fcm')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(@Body() payload: FcmPayload): Promise<{ readonly received: boolean }> {
    this.logger.log(
      `📨 FCM webhook: msg=${payload.messageId} state=${payload.state}`,
    );

    await this.commandBus.execute(
      new HandleFcmWebhookCommand({ payload: payload as never }) as never,
    );

    return { received: true };
  }
}
