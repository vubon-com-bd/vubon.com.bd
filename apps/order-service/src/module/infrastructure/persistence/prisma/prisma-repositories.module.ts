/**
 * PrismaRepositoriesModule — wires all 13 domain repositories
 * @module order-service/infrastructure/persistence/prisma
 *
 * Binds each Prisma repository class to its domain-level symbol token
 * so that application layer can inject via `@Inject(ORDER_REPOSITORY)`.
 *
 * NOTE: PrismaModule (from shared-kernel) is @Global(), so PrismaService is
 * available without importing it here.
 */
import { Module } from '@nestjs/common';

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
import { ORDER_HISTORY_REPOSITORY } from '../../../domain/repositories/order-history.repository.interface.js';
import { ORDER_TRACKING_REPOSITORY } from '../../../domain/repositories/order-tracking.repository.interface.js';

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
import { OrderHistoryPrismaRepository } from './repositories/order-history.prisma.repository.js';
import { OrderTrackingPrismaRepository } from './repositories/order-tracking.prisma.repository.js';

@Module({
  providers: [
    OrderPrismaRepository,
    { provide: ORDER_REPOSITORY, useExisting: OrderPrismaRepository },

    OrderItemPrismaRepository,
    { provide: ORDER_ITEM_REPOSITORY, useExisting: OrderItemPrismaRepository },

    CheckoutPrismaRepository,
    { provide: CHECKOUT_REPOSITORY, useExisting: CheckoutPrismaRepository },

    CheckoutSessionPrismaRepository,
    { provide: CHECKOUT_SESSION_REPOSITORY, useExisting: CheckoutSessionPrismaRepository },

    DeliveryPrismaRepository,
    { provide: DELIVERY_REPOSITORY, useExisting: DeliveryPrismaRepository },

    DeliveryMethodPrismaRepository,
    { provide: DELIVERY_METHOD_REPOSITORY, useExisting: DeliveryMethodPrismaRepository },

    ShippingAddressPrismaRepository,
    { provide: SHIPPING_ADDRESS_REPOSITORY, useExisting: ShippingAddressPrismaRepository },

    BillingAddressPrismaRepository,
    { provide: BILLING_ADDRESS_REPOSITORY, useExisting: BillingAddressPrismaRepository },

    OrderCancelPrismaRepository,
    { provide: ORDER_CANCEL_REPOSITORY, useExisting: OrderCancelPrismaRepository },

    OrderReturnPrismaRepository,
    { provide: ORDER_RETURN_REPOSITORY, useExisting: OrderReturnPrismaRepository },

    OrderFulfillmentPrismaRepository,
    { provide: ORDER_FULFILLMENT_REPOSITORY, useExisting: OrderFulfillmentPrismaRepository },

    OrderHistoryPrismaRepository,
    { provide: ORDER_HISTORY_REPOSITORY, useExisting: OrderHistoryPrismaRepository },

    OrderTrackingPrismaRepository,
    { provide: ORDER_TRACKING_REPOSITORY, useExisting: OrderTrackingPrismaRepository },
  ],
  exports: [
    ORDER_REPOSITORY,
    ORDER_ITEM_REPOSITORY,
    CHECKOUT_REPOSITORY,
    CHECKOUT_SESSION_REPOSITORY,
    DELIVERY_REPOSITORY,
    DELIVERY_METHOD_REPOSITORY,
    SHIPPING_ADDRESS_REPOSITORY,
    BILLING_ADDRESS_REPOSITORY,
    ORDER_CANCEL_REPOSITORY,
    ORDER_RETURN_REPOSITORY,
    ORDER_FULFILLMENT_REPOSITORY,
    ORDER_HISTORY_REPOSITORY,
    ORDER_TRACKING_REPOSITORY,
  ],
})
export class PrismaRepositoriesModule {}
