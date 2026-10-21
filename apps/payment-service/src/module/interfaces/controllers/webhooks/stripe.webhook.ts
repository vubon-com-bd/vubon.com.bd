/**
 * StripeWebhookController
 * @module payment-service/interfaces/controllers/webhooks
 */
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { HandleStripeWebhookCommand } from '@application/commands/webhook/handle-stripe-webhook.command';
import type { StripeWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/stripe')
export class StripeWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async handle(
    @Body() body: StripeWebhookHttpDTO,
    @Headers('stripe-signature') signature?: string,
  ): Promise<{ readonly received: true }> {
    await this.commandBus.execute(
      new HandleStripeWebhookCommand({
        id: body.id,
        type: body.type,
        data: body.data,
        signature: signature ?? '',
        rawPayload: body as unknown as Readonly<Record<string, unknown>>,
      }),
    );
    return { received: true };
  }
}
