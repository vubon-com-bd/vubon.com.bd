/**
 * Vonage SMS Webhook Controller
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

interface VonageDeliveryReceipt {
  readonly messageId?: string;
  readonly status?: string;
  readonly 'err-code'?: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class VonageWebhookController {
  private readonly logger = new Logger(VonageWebhookController.name);

  @Post('vonage')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(
    @Body() payload: VonageDeliveryReceipt,
  ): Promise<{ readonly received: boolean }> {
    this.logger.log(
      `📨 Vonage webhook: msg=${payload.messageId ?? 'unknown'} status=${payload.status ?? 'unknown'}`,
    );
    return { received: true };
  }
}
