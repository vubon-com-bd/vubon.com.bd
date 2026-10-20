/**
 * InMemory Repositories Module
 * @module order-service/infrastructure/persistence/memory
 *
 * Provides InMemory implementations of all domain repositories.
 * Used when DB_MODE=memory (dev/test — no DB required).
 */
import { Module } from '@nestjs/common';

// ─── Domain DI Tokens ──────────────────────
import { ORDER_REPOSITORY } from '../../../domain/repositories/order.repository.interface.js';
import { ORDER_ITEM_REPOSITORY } from '../../../domain/repositories/order-item.repository.interface.js';
import { CHECKOUT_REPOSITORY } from '../../../domain/repositories/checkout.repository.interface.js';
import { CHECKOUT_SESSION_REPOSITORY } from '../../../domain/repositories/checkout-session.repository.interface.js';
import { DELIVERY_REPOSITORY } from '../../../domain/repositories/delivery.repository.interface.js';
import { DELIVERY_METHOD_REPOSITORY } from '../../../domain/repositories/delivery-method.repository.interface.js';
import { SHIPPING_ADDRESS_REPOSITORY } from '../../../domain/repositories/shipping-address.repository.interface.js';
import { BILLING_ADDRESS_REPOSITORY } from '../../../domain/repositories/billing-address.repository.interface.js';
import { ORDER_CANCEL_REPOSITORY } from '../../../domain/repositories/order-cancel.repository.interface.js';
import { ORDER_RETURN_REPOSITORY } from '../../../domain/repositories/order-return.repository.interface.js';
import { ORDER_FULFILLMENT_REPOSITORY } from '../../../domain/repositories/order-fulfillment.repository.interface.js';
import { ORDER_TRACKING_REPOSITORY } from '../../../domain/repositories/order-tracking.repository.interface.js';

// ─── Memory implementations ─────────────────
import { InMemoryOrderRepository } from './repositories/order.memory.repository.js';
import { InMemoryOrderItemRepository } from './repositories/order-item.memory.repository.js';
import { InMemoryCheckoutRepository } from './repositories/checkout.memory.repository.js';
import { InMemoryCheckoutSessionRepository } from './repositories/checkout-session.memory.repository.js';
import { InMemoryDeliveryRepository } from './repositories/delivery.memory.repository.js';
import { InMemoryDeliveryMethodRepository } from './repositories/delivery-method.memory.repository.js';
import { InMemoryShippingAddressRepository } from './repositories/shipping-address.memory.repository.js';
import { InMemoryBillingAddressRepository } from './repositories/billing-address.memory.repository.js';
import { InMemoryOrderCancelRepository } from './repositories/order-cancel.memory.repository.js';
import { InMemoryOrderReturnRepository } from './repositories/order-return.memory.repository.js';
import { InMemoryOrderFulfillmentRepository } from './repositories/order-fulfillment.memory.repository.js';
import { InMemoryOrderTrackingRepository } from './repositories/order-tracking.memory.repository.js';

const REPOSITORIES = [
  { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  { provide: ORDER_ITEM_REPOSITORY, useClass: InMemoryOrderItemRepository },
  { provide: CHECKOUT_REPOSITORY, useClass: InMemoryCheckoutRepository },
  { provide: CHECKOUT_SESSION_REPOSITORY, useClass: InMemoryCheckoutSessionRepository },
  { provide: DELIVERY_REPOSITORY, useClass: InMemoryDeliveryRepository },
  { provide: DELIVERY_METHOD_REPOSITORY, useClass: InMemoryDeliveryMethodRepository },
  { provide: SHIPPING_ADDRESS_REPOSITORY, useClass: InMemoryShippingAddressRepository },
  { provide: BILLING_ADDRESS_REPOSITORY, useClass: InMemoryBillingAddressRepository },
  { provide: ORDER_CANCEL_REPOSITORY, useClass: InMemoryOrderCancelRepository },
  { provide: ORDER_RETURN_REPOSITORY, useClass: InMemoryOrderReturnRepository },
  { provide: ORDER_FULFILLMENT_REPOSITORY, useClass: InMemoryOrderFulfillmentRepository },
  { provide: ORDER_TRACKING_REPOSITORY, useClass: InMemoryOrderTrackingRepository },
];

@Module({
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class MemoryRepositoriesModule {}
