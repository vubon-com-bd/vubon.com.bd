import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { SetShippingMethodCommand } from '../../../application/commands/shipping/set-shipping-method.command';
import { CalculateShippingCommand } from '../../../application/commands/shipping/calculate-shipping.command';
import {
  SetShippingMethodRequestDto,
  CalculateShippingRequestDto,
} from '../../dtos/requests/shipping.request.dto';

@Controller('v1/cart/shipping')
@UseGuards(JwtAuthGuard)
export class CartShippingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('method')
  @HttpCode(HttpStatus.OK)
  async setMethod(@Body() body: SetShippingMethodRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new SetShippingMethodCommand(body.cartId, body.method, 0, body.addressId),
    );
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  async calculate(@Body() body: CalculateShippingRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CalculateShippingCommand(body.cartId, 'standard', body.addressId),
    );
  }
}
