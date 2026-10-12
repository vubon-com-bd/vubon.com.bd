/**
 * PathaoWebhookController
 * @module logistics-service/interfaces/controllers/webhooks
 */
import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { PathaoWebhookDTO } from '../../../application/dtos/requests/webhook/pathao-webhook.dto.js';

@ApiTags('webhooks')
@Controller('webhooks/couriers/pathao')
export class PathaoWebhookController {
  @Post(':secret')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive Pathao webhook event' })
  async receive(
    @Param('secret') secret: string,
    @Body() payload: PathaoWebhookDTO,
    @Headers('x-pathao-signature') _signature?: string,
  ): Promise<{ received: true }> {
    if (!secret || secret.length < 8) {
      throw new UnauthorizedException('Invalid webhook secret');
    }
    // TODO: verify signature against PATHAO_CONFIG.webhookSecretName
    // TODO: enqueue tracking update job
    void payload;
    return { received: true };
  }
}
