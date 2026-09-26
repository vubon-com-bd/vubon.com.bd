import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetTotalsQuery } from '../../../application/queries/totals/get-totals.query';

@Controller('v1/cart/totals')
@UseGuards(JwtAuthGuard)
export class CartTotalsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':cartId')
  async get(@Param('cartId') cartId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTotalsQuery(cartId));
  }
}
