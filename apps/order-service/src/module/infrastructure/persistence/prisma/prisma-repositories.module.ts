/**
 * Prisma Repositories Module
 * @module order-service/infrastructure/persistence/prisma
 *
 * Provides BOTH concrete classes AND symbol tokens for @Inject().
 */
import { Module } from '@nestjs/common';
import { OrderPrismaModule } from './prisma.module.js';

import { OrderPrismaRepository } from './repositories/order.prisma.repository.js';
import { OrderItemPrismaRepository } from './repositories/order-item.prisma.repository.js';
import { CheckoutPrismaRepository } from './repositories/checkout.prisma.repository.js';
import { CheckoutSessionPrismaRepository } from './repositories/checkout-session.prisma.repository.js';
import { DeliveryPrismaRepository } from './repositories/delivery.prisma.repository.js';
import { DeliveryMethodPrismaRepository } from './repositories/delivery-method.prisma.repository.js';
import { ShippingAddressPrismaRepository } from './repositories/shipping-address.prisma.repository.js';
import { BillingAddressPrismaRepository } from './repositories/billing-address.prisma.repository.js';
import { OrderCancelPrismaRepository } from './repositories/order-cancel.prisma.repository.js';
import { OrderReturnPrismaRepository } from './repositories/order-return.prisma.repository.js';
import { OrderFulfillmentPrismaRepository } from './repositories/order-fulfillment.prisma.repository.js';
import { OrderTrackingPrismaRepository } from './repositories/order-tracking.prisma.repository.js';

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

const REPOSITORIES = [
  OrderPrismaRepository,
  OrderItemPrismaRepository,
  CheckoutPrismaRepository,
  CheckoutSessionPrismaRepository,
  DeliveryPrismaRepository,
  DeliveryMethodPrismaRepository,
  ShippingAddressPrismaRepository,
  BillingAddressPrismaRepository,
  OrderCancelPrismaRepository,
  OrderReturnPrismaRepository,
  OrderFulfillmentPrismaRepository,
  OrderTrackingPrismaRepository,
];

const TOKEN_PROVIDERS = [
  { provide: ORDER_REPOSITORY, useExisting: OrderPrismaRepository },
  { provide: ORDER_ITEM_REPOSITORY, useExisting: OrderItemPrismaRepository },
  { provide: CHECKOUT_REPOSITORY, useExisting: CheckoutPrismaRepository },
  { provide: CHECKOUT_SESSION_REPOSITORY, useExisting: CheckoutSessionPrismaRepository },
  { provide: DELIVERY_REPOSITORY, useExisting: DeliveryPrismaRepository },
  { provide: DELIVERY_METHOD_REPOSITORY, useExisting: DeliveryMethodPrismaRepository },
  { provide: SHIPPING_ADDRESS_REPOSITORY, useExisting: ShippingAddressPrismaRepository },
  { provide: BILLING_ADDRESS_REPOSITORY, useExisting: BillingAddressPrismaRepository },
  { provide: ORDER_CANCEL_REPOSITORY, useExisting: OrderCancelPrismaRepository },
  { provide: ORDER_RETURN_REPOSITORY, useExisting: OrderReturnPrismaRepository },
  { provide: ORDER_FULFILLMENT_REPOSITORY, useExisting: OrderFulfillmentPrismaRepository },
  { provide: ORDER_TRACKING_REPOSITORY, useExisting: OrderTrackingPrismaRepository },
];

@Module({
  imports: [OrderPrismaModule],
  providers: [...REPOSITORIES, ...TOKEN_PROVIDERS],
  exports: [...REPOSITORIES, ...TOKEN_PROVIDERS],
})
export class PrismaRepositoriesModule {}
