import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderHistoryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-history.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [OrderHistoryPrismaRepository],
  exports: [OrderHistoryPrismaRepository],
})
export class OrderHistoryModule {}
