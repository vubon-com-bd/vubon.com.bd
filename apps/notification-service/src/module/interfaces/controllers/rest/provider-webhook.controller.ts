/**
 * ProviderWebhookController — inbound webhook receiver (PUBLIC)
 * @module notification-service/interfaces/controllers/rest
 *
 * NOTE: Endpoint is intentionally PUBLIC — providers don't send JWTs.
 * Signature verification happens inside ProviderWebhookService.
 */
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { ProcessProviderWebhookCommand } from '../../../application/commands/provider-webhook/process-provider-webhook.command.js';

@ApiTags('provider-webhooks')
@Controller('provider-webhooks')
export class ProviderWebhookController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Public()
  @Post(':provider')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive a provider webhook (inbound)' })
  async receive(
    @Param('provider') provider: string,
    @Body() body: Record<string, unknown>,
    @Headers() headers: Record<string, string>,
    @Req() req: Request & { rawBody?: Buffer },
  ): Promise<unknown> {
    const signature =
      headers['x-twilio-signature'] ??
      headers['x-sendgrid-signature'] ??
      headers['x-mailgun-signature'] ??
      headers['x-webhook-signature'] ??
      (body['signature'] as string | undefined);

    const rawBody = req.rawBody
      ? req.rawBody.toString('utf8')
      : JSON.stringify(body);

    return this.commandBus.execute(
      new ProcessProviderWebhookCommand({
        provider: provider as never,
        body,
        headers,
        signature,
        rawBody,
      }),
    );
  }
}
