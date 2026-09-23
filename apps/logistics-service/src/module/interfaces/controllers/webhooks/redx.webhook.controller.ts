import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '@vubon/shared-kernel/interfaces';
import { REDX_CONFIG } from '@vubon/shared-config/logistics';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';

interface RedxWebhookDto {
  readonly tracking_id: string;
  readonly status: string;
}

@Controller('webhooks/redx')
export class RedxWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: RedxWebhookDto,
    @Headers('x-redx-signature') signature?: string,
  ): Promise<{ received: true }> {
    if (!signature) throw new UnauthorizedException('Missing signature');
    const expected = createHmac('sha256', REDX_CONFIG.apiKey)
      .update(JSON.stringify(body))
      .digest('hex');
    try {
      if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
        throw new UnauthorizedException('Invalid signature');
      }
    } catch {
      throw new UnauthorizedException('Invalid signature');
    }
    await this.commandBus.execute(
      new UpdateShipmentCommand(body.tracking_id, body.status),
    );
    return { received: true };
  }
}
