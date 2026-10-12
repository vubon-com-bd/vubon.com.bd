import { Body, Controller, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { SaParibahanWebhookDTO } from '../../../application/dtos/requests/webhook/sa-paribahan-webhook.dto.js';

@ApiTags('webhooks')
@Controller('webhooks/couriers/sa-paribahan')
export class SaParibahanWebhookController {
  @Post(':secret')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive SA Paribahan webhook event' })
  async receive(@Param('secret') secret: string, @Body() payload: SaParibahanWebhookDTO): Promise<{ received: true }> {
    if (!secret || secret.length < 8) throw new UnauthorizedException('Invalid webhook secret');
    void payload;
    return { received: true };
  }
}
