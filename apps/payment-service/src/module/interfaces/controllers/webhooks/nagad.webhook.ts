/**
 * NagadWebhookController
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

import { HandleNagadWebhookCommand } from '@application/commands/webhook/handle-nagad-webhook.command';
import type { NagadWebhookHttpDTO } from '@interfaces/dtos/requests/webhook.request.dto';

@ApiExcludeController()
@ApiTags('webhooks')
@Controller('webhooks/nagad')
export class NagadWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Nagad webhook endpoint' })
  async handle(
    @Body() body: NagadWebhookHttpDTO,
    @Headers() headers: Record<string, string | string[] | undefined>,
  ): Promise<{ readonly acknowledged: true }> {
    void headers;
    await this.commandBus.execute(
      new HandleNagadWebhookCommand({
        orderId: body.orderId,
        paymentRefId: body.paymentRefId,
        amount: body.amount,
        status: body.status,
        issuerPaymentRefNo: body.issuerPaymentRefNo,
        signature: body.signature,
        rawPayload: body as unknown as Readonly<Record<string, unknown>>,
      }),
    );
    return { acknowledged: true };
  }
}
