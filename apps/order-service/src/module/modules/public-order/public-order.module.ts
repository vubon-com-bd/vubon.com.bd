import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GetOrderHandler } from '../../application/queries/order/get-order.handler';
import { GetOrderByNumberHandler } from '../../application/queries/order/get-order-by-number.handler';
import { OrderPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    OrderPrismaRepository,
    GetOrderHandler,
    GetOrderByNumberHandler,
  ],
  exports: [],
})
export class PublicOrderModule {}
