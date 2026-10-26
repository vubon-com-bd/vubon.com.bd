/**
 * AWS SES Webhook Controller (via SNS)
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

interface SesSnsMessage {
  readonly Type?: string;
  readonly Message?: string;
  readonly SubscribeURL?: string;
  readonly [key: string]: unknown;
}

@ApiExcludeController()
@Controller('webhooks/providers')
@Public()
export class SesWebhookController {
  private readonly logger = new Logger(SesWebhookController.name);

  @Post('ses')
  @HttpCode(HttpStatus.OK)
  @UseGuards(WebhookSignatureGuard)
  async handle(@Body() body: SesSnsMessage): Promise<{ readonly received: boolean }> {
    this.logger.log(`📨 SES webhook: type=${body.Type ?? 'unknown'}`);
    return { received: true };
  }
}
