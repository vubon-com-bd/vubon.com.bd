import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetOrderByNumberQuery } from '../../../application/queries/order/get-order-by-number.query';

@ApiTags('Public Orders')
@Controller('public/orders')
export class PublicOrderController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get(':orderNumber')
  async get(@Param('orderNumber') orderNumber: string): Promise<unknown> {
    return this.queryBus.execute(new GetOrderByNumberQuery(orderNumber));
  }
}
