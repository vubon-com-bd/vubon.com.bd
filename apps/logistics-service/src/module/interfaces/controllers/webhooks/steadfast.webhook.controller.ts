import { Body, Controller, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { SteadfastWebhookDTO } from '../../../application/dtos/requests/webhook/steadfast-webhook.dto.js';

@ApiTags('webhooks')
@Controller('webhooks/couriers/steadfast')
export class SteadfastWebhookController {
  @Post(':secret')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive Steadfast webhook event' })
  async receive(@Param('secret') secret: string, @Body() payload: SteadfastWebhookDTO): Promise<{ received: true }> {
    if (!secret || secret.length < 8) throw new UnauthorizedException('Invalid webhook secret');
    void payload;
    return { received: true };
  }
}
