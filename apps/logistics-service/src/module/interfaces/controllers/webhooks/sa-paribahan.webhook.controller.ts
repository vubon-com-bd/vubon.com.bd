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
import { SA_PARIBAHAN_CONFIG } from '@vubon/shared-config/logistics';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';

interface SaParibahanWebhookDto {
  readonly trackingNumber: string;
  readonly status: string;
  readonly timestamp: string;
}

@Controller('webhooks/sa-paribahan')
export class SaParibahanWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: SaParibahanWebhookDto,
    @Headers('x-signature') signature?: string,
  ): Promise<{ received: true }> {
    if (!this.verify(body, signature)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }
    await this.commandBus.execute(
      new UpdateShipmentCommand(body.trackingNumber, body.status),
    );
    return { received: true };
  }

  private verify(body: SaParibahanWebhookDto, signature?: string): boolean {
    if (!signature) return false;
    const payload = JSON.stringify(body);
    const expected = createHmac('sha256', SA_PARIBAHAN_CONFIG.apiKey)
      .update(payload)
      .digest('hex');
    try {
      return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    } catch {
      return false;
    }
  }
}
