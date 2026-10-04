import { Body, Controller, Post, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { SetShippingMethodCommand } from '../../../application/commands/shipping/set-shipping-method.command.js';
import { CalculateShippingCommand } from '../../../application/commands/shipping/calculate-shipping.command.js';
import { SetShippingMethodHttpDTO, CalculateShippingHttpDTO } from '../../dtos/requests/shipping.request.dto.js';

@ApiTags('cart-shipping')
@ApiBearerAuth('bearer')
@Controller('cart/:cartId/shipping')
@UseGuards(JwtAuthGuard)
export class CartShippingController extends BaseController {
  constructor(private readonly commandBus: CommandBus) { super(); }

  @Post()
  @ApiOperation({ summary: 'Set shipping method' })
  async setMethod(
    @Param('cartId') cartId: string,
    @Body() dto: SetShippingMethodHttpDTO,
  ) {
    return this.commandBus.execute(new SetShippingMethodCommand({ cartId, ...dto }));
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate shipping totals' })
  async calculate(
    @Param('cartId') cartId: string,
    @Body() dto: CalculateShippingHttpDTO,
  ) {
    return this.commandBus.execute(new CalculateShippingCommand({ cartId, ...dto }));
  }
}
