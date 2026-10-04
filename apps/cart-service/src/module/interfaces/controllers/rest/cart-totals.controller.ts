import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetTotalsQuery } from '../../../application/queries/totals/get-totals.query.js';

@ApiTags('cart-totals')
@ApiBearerAuth('bearer')
@Controller('cart/:cartId/totals')
@UseGuards(JwtAuthGuard)
export class CartTotalsController extends BaseController {
  constructor(private readonly queryBus: QueryBus) { super(); }

  @Get()
  @ApiOperation({ summary: 'Get cart totals' })
  async get(@Param('cartId') cartId: string) {
    return this.queryBus.execute(new GetTotalsQuery(cartId));
  }
}
