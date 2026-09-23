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
import { PATHAO_CONFIG } from '@vubon/shared-config/logistics';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';

interface PathaoWebhookDto {
  readonly consignment_id: string;
  readonly delivery_status: string;
}

@Controller('webhooks/pathao')
export class PathaoWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() body: PathaoWebhookDto,
    @Headers('x-pathao-signature') signature?: string,
  ): Promise<{ received: true }> {
    if (!signature) throw new UnauthorizedException('Missing signature');
    const expected = createHmac('sha256', PATHAO_CONFIG.clientSecret)
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
      new UpdateShipmentCommand(body.consignment_id, body.delivery_status),
    );
    return { received: true };
  }
}
