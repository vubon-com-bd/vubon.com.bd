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
import { SUNDARBAN_CONFIG } from '@vubon/shared-config/logistics';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';

interface SundarbanWebhookDto {
  readonly tracking_number: string;
  readonly status: string;
}

@Controller('webhooks/sundarban')
export class SundarbanWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: SundarbanWebhookDto,
    @Headers('x-signature') signature?: string,
  ): Promise<{ received: true }> {
    if (!signature) throw new UnauthorizedException('Missing signature');
    const expected = createHmac('sha256', SUNDARBAN_CONFIG.apiKey)
      .update(JSON.stringify(body))
      .digest('hex');
    if (!this.safeCompare(signature, expected)) {
      throw new UnauthorizedException('Invalid signature');
    }
    await this.commandBus.execute(
      new UpdateShipmentCommand(body.tracking_number, body.status),
    );
    return { received: true };
  }

  private safeCompare(a: string, b: string): boolean {
    try {
      return timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
      return false;
    }
  }
}
