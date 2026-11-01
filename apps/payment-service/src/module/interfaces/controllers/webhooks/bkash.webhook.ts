/**
 * BkashWebhookController
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

import { HandleBkashWebhookCommand } from '@application/commands/webhook/handle-bkash-webhook.command';
import type { BkashWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/bkash')
export class BkashWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'bKash webhook endpoint' })
  async handle(
    @Body() body: BkashWebhookHttpDTO,
    @Headers() headers: Record<string, string | string[] | undefined>,
  ): Promise<{ readonly acknowledged: true }> {
    const normalizedHeaders: Record<string, string> = {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === 'string') normalizedHeaders[k.toLowerCase()] = v;
      else if (Array.isArray(v)) normalizedHeaders[k.toLowerCase()] = v[0] ?? '';
    }

    await this.commandBus.execute(
      new HandleBkashWebhookCommand({
        paymentID: body.paymentID,
        trxID: body.trxID,
        amount: body.amount,
        currency: body.currency,
        transactionStatus: body.transactionStatus,
        signature: body.signature,
        rawPayload: body as unknown as Readonly<Record<string, unknown>>,
      }),
    );

    void normalizedHeaders;
    return { acknowledged: true };
  }
}
