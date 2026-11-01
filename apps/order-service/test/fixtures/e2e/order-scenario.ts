/**
 * E2E Order Scenario Helpers
 * @module order-service/test/fixtures/e2e
 */
import { OrderEntity } from '@domain/entities/order.entity.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import {
  fixtureOrderVO,
  fixtureShippingAddressVO,
  fixtureBillingAddressVO,
} from '@fixtures/domain/composite-fixtures.js';
import {
  fixtureOrderId,
  fixtureOrderItemId,
  fixtureProductId,
} from '@fixtures/domain/primitive-fixtures.js';

export const E2E_NOW = '2024-06-15T10:00:00.000Z';

export function createOrderItem(): OrderItemVO {
  return OrderItemVO.create({
    id: fixtureOrderItemId,
    orderId: fixtureOrderId,
    productId: fixtureProductId,
    name: 'E2E Test Item',
    sku: 'SKU-E2E-001',
    quantity: OrderItemQuantityVO.create(2),
    unitPrice: OrderItemPriceVO.create(500, 'BDT'),
    status: OrderItemStatusVO.pending(),
  });
}

export function createPendingOrder(): OrderEntity {
  return OrderEntity.create({
    id: fixtureOrderId.value,
    vo: fixtureOrderVO,
    items: [createOrderItem()],
    shippingAddress: fixtureShippingAddressVO,
    billingAddress: fixtureBillingAddressVO,
    now: E2E_NOW,
  });
}

export function createConfirmedOrder(): OrderEntity {
  const order = createPendingOrder();
  order.confirm('admin-1', E2E_NOW);
  return order;
}

export function createProcessingOrder(): OrderEntity {
  const order = createConfirmedOrder();
  order.startProcessing(E2E_NOW);
  return order;
}

export function createPackedOrder(): OrderEntity {
  const order = createProcessingOrder();
  order.pack(E2E_NOW);
  return order;
}

export function createShippedOrder(): OrderEntity {
  const order = createPackedOrder();
  order.ship('admin-1', E2E_NOW);
  return order;
}

export function createDeliveredOrder(): OrderEntity {
  const order = createShippedOrder();
  order.markDelivered('customer', E2E_NOW);
  return order;
}

export function createCompletedOrder(): OrderEntity {
  const order = createDeliveredOrder();
  order.complete(E2E_NOW);
  return order;
}

export function createCancelledOrder(): OrderEntity {
  const order = createPendingOrder();
  order.cancel('customer request', 'customer-1', E2E_NOW);
  return order;
}
