/**
 * HandlersModule — cross-service event consumers for cart-service
 * @module cart-service/modules/handlers
 */
import { Module } from '@nestjs/common';

import { ProductEventsHandler } from '../../infrastructure/handlers/product-events.handler.js';
import { InventoryEventsHandler } from '../../infrastructure/handlers/inventory-events.handler.js';

@Module({
  providers: [ProductEventsHandler, InventoryEventsHandler],
  exports: [ProductEventsHandler, InventoryEventsHandler],
})
export class HandlersModule {}
