/**
 * Apple Push Notification Service (APNs) Webhook Controller
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
import { HandleApnsWebhookCommand } from '@application/commands/provider-webhook/handle-apns-webhook.command.js';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

interface ApnsPayload {
  readonly apnsId: string;
  readonly state: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class ApnsWebhookController {
  private readonly logger = new Logger(ApnsWebhookController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('apns')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(@Body() payload: ApnsPayload): Promise<{ readonly received: boolean }> {
    this.logger.log(
      `📨 APNs webhook: apnsId=${payload.apnsId} state=${payload.state}`,
    );

    await this.commandBus.execute(
      new HandleApnsWebhookCommand({ payload: payload as never }) as never,
    );

    return { received: true };
  }
}
