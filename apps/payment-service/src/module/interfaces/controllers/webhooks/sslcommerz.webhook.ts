/**
 * SslcommerzWebhookController
 * @module payment-service/interfaces/controllers/webhooks
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { HandleSslcommerzWebhookCommand } from '@application/commands/webhook/handle-sslcommerz-webhook.command';
import type { SslcommerzWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/sslcommerz')
export class SslcommerzWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSLCommerz webhook endpoint' })
  async handle(
    @Body() body: SslcommerzWebhookHttpDTO,
  ): Promise<{ readonly acknowledged: true }> {
    await this.commandBus.execute(
      new HandleSslcommerzWebhookCommand({
        tran_id: body.tran_id,
        val_id: body.val_id,
        amount: body.amount,
        status: body.status,
        verify_sign: body.verify_sign,
        verify_key: body.verify_key,
        rawPayload: body as unknown as Readonly<Record<string, unknown>>,
      }),
    );
    return { acknowledged: true };
  }
}
