/**
 * OrderHistoryModule — append-only audit
 * @module order-service/modules/order-history
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ORDER_HISTORY_QUERY_HANDLERS } from './queries/index.js';

@Module({
  imports: [CqrsModule],
  providers: [...(ORDER_HISTORY_QUERY_HANDLERS as readonly unknown[] as never[])],
  exports: [],
})
export class OrderHistoryModule {}
