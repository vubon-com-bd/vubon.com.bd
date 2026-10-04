/**
 * OrderHistoryModule — audit/history read model
 * @module order-service/modules/order-history
 *
 * No controller (accessed through OrderController's detail view).
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
})
export class OrderHistoryModule {}
