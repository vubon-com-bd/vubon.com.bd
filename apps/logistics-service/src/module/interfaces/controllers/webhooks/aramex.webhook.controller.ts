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
import { ARAMEX_CONFIG } from '@vubon/shared-config/logistics';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';

interface AramexWebhookDto {
  readonly trackingNumber: string;
  readonly status: string;
}

@Controller('webhooks/aramex')
export class AramexWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: AramexWebhookDto,
    @Headers('x-aramex-signature') signature?: string,
  ): Promise<{ received: true }> {
    if (!signature) throw new UnauthorizedException('Missing signature');
    const expected = createHmac('sha256', ARAMEX_CONFIG.apiKey)
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
      new UpdateShipmentCommand(body.trackingNumber, body.status),
    );
    return { received: true };
  }
}
