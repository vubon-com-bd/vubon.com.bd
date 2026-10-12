import { Body, Controller, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { RedxWebhookDTO } from '../../../application/dtos/requests/webhook/redx-webhook.dto.js';

@ApiTags('webhooks')
@Controller('webhooks/couriers/redx')
export class RedxWebhookController {
  @Post(':secret')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive RedX webhook event' })
  async receive(@Param('secret') secret: string, @Body() payload: RedxWebhookDTO): Promise<{ received: true }> {
    if (!secret || secret.length < 8) throw new UnauthorizedException('Invalid webhook secret');
    void payload;
    return { received: true };
  }
}
