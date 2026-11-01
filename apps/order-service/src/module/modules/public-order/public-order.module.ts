/**
 * PublicOrderModule — public (no-auth) routes
 * @module order-service/modules/public-order
 *
 * NOTE: PublicOrderController is registered in OrderModule (shares OrderService).
 * This module is reserved for future public-only concerns.
 */
import { Module } from '@nestjs/common';
import { PUBLIC_ORDER_QUERY_HANDLERS } from './queries/index.js';

@Module({
  providers: [...(PUBLIC_ORDER_QUERY_HANDLERS as readonly unknown[] as never[])],
  exports: [],
})
export class PublicOrderModule {}
