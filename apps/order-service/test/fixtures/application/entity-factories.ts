/**
 * Application Test Fixtures — Entity Factories
 * @module order-service/test/fixtures/application
 *
 * Simplify entity creation for mapper/service tests.
 * Includes getters that service code accesses (orderId, status, customerId).
 */
import type { OrderEntity } from '@domain/entities/order.entity.js';
import type { OrderItemEntity } from '@domain/entities/order-item.entity.js';
import type { CheckoutEntity } from '@domain/entities/checkout.entity.js';
import type { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import type { OrderCancelEntity } from '@domain/entities/order-cancel.entity.js';
import type { OrderReturnEntity } from '@domain/entities/order-return.entity.js';
import type { OrderFulfillmentEntity } from '@domain/entities/order-fulfillment.entity.js';
import type { OrderTrackingEntity } from '@domain/entities/order-tracking.entity.js';

export const FIXTURE_NOW = '2024-06-15T12:00:00.000Z';
export const FIXTURE_ID = '550e8400-e29b-41d4-a716-446655440000';
export const FIXTURE_ID_2 = '660f9511-f3ac-52e5-b827-557766551111';

export function makeOrderEntityStub(overrides: Record<string, unknown> = {}): OrderEntity {
  const vo = {
    id: { value: FIXTURE_ID },
    orderNumber: { value: 'ORD-2024-000123' },
    customerId: { value: FIXTURE_ID_2 },
    status: { value: 'pending', isPending: () => true, isTerminal: () => false, isActive: () => true, isCancelled: () => false },
    priority: { value: 'normal' },
    channel: { value: 'web' },
    source: { value: 'customer' },
    subtotal: { amount: 100, currency: 'BDT' },
    discount: { amount: 10, currency: 'BDT' },
    tax: { amount: 5, currency: 'BDT' },
    shipping: { amount: 20, currency: 'BDT' },
    total: { amount: 115, currency: 'BDT' },
    note: { value: 'Please deliver before 5pm', isEmpty: () => false },
    ...overrides,
  };
  return { id: FIXTURE_ID, vo, items: [], createdAt: FIXTURE_NOW, updatedAt: FIXTURE_NOW } as unknown as OrderEntity;
}

export function makeOrderItemEntityStub(overrides: Record<string, unknown> = {}): OrderItemEntity {
  const vo = {
    id: { value: FIXTURE_ID },
    orderId: { value: FIXTURE_ID_2 },
    productId: { value: FIXTURE_ID },
    variantId: { value: FIXTURE_ID_2 },
    vendorId: { value: FIXTURE_ID },
    name: 'Sample Product',
    sku: 'SKU-001',
    quantity: { value: 2 },
    unitPrice: { amount: 50, currency: 'BDT' },
    status: { value: 'pending', isCancellable: () => true, isReturnable: () => false },
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get productId() { return vo.productId; },
    get quantity() { return vo.quantity; },
    get status() { return vo.status; },
    lineTotal: 100,
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as OrderItemEntity;
}

export function makeCheckoutEntityStub(overrides: Record<string, unknown> = {}): CheckoutEntity {
  const vo = {
    id: { value: FIXTURE_ID },
    customerId: { value: FIXTURE_ID_2 },
    status: { value: 'started' },
    currentStep: { value: 'cart' },
    expiresAt: '2024-06-15T13:00:00.000Z',
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get customerId() { return vo.customerId; },
    get status() { return vo.status; },
    get currentStep() { return vo.currentStep; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as CheckoutEntity;
}

export function makeCheckoutSessionEntityStub(overrides: Record<string, unknown> = {}) {
  const vo = {
    checkoutId: { value: FIXTURE_ID },
    status: { value: 'started' },
    currentStep: { value: 'cart' },
    shippingAddressId: { value: FIXTURE_ID_2 },
    deliveryMethodId: { value: FIXTURE_ID },
    paymentMethod: 'bkash',
    startedAt: FIXTURE_NOW,
    lastActivityAt: FIXTURE_NOW,
    ...overrides,
  };
  return { id: FIXTURE_ID, vo, createdAt: FIXTURE_NOW, updatedAt: FIXTURE_NOW };
}

export function makeDeliveryEntityStub(overrides: Record<string, unknown> = {}): DeliveryEntity {
  const vo = {
    orderId: { value: FIXTURE_ID_2 },
    methodId: { value: FIXTURE_ID },
    status: { value: 'pending', isDelivered: () => false, isFailed: () => false },
    type: { value: 'standard' },
    trackingNumber: { value: 'TRK-ABCD1234' },
    courierId: FIXTURE_ID,
    estimatedAt: '2024-06-20T12:00:00.000Z',
    deliveredAt: undefined,
    attempts: 0,
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get methodId() { return vo.methodId; },
    get status() { return vo.status; },
    get trackingNumber() { return vo.trackingNumber; },
    get attempts() { return vo.attempts; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as DeliveryEntity;
}

export function makeDeliveryMethodEntityStub(overrides: Record<string, unknown> = {}) {
  const vo = {
    name: 'Standard Delivery',
    type: { value: 'flat_rate' },
    carrier: 'Pathao',
    baseCost: 60,
    currency: 'BDT',
    estimatedDays: 3,
    isActive: true,
    ...overrides,
  };
  return { id: FIXTURE_ID, vo, createdAt: FIXTURE_NOW, updatedAt: FIXTURE_NOW };
}

export function makeCancelEntityStub(overrides: Record<string, unknown> = {}): OrderCancelEntity {
  const vo = {
    orderId: { value: FIXTURE_ID_2 },
    reason: { value: 'customer_request' },
    status: { value: 'requested' },
    requestedBy: FIXTURE_ID,
    approvedBy: undefined,
    notes: 'Change of mind',
    requestedAt: FIXTURE_NOW,
    processedAt: undefined,
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get status() { return vo.status; },
    get reason() { return vo.reason; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as OrderCancelEntity;
}

export function makeReturnEntityStub(overrides: Record<string, unknown> = {}): OrderReturnEntity {
  const vo = {
    orderId: { value: FIXTURE_ID_2 },
    customerId: { value: FIXTURE_ID },
    status: { value: 'requested' },
    reason: { value: 'defective' },
    itemIds: [FIXTURE_ID, FIXTURE_ID_2],
    notes: 'Product broken',
    requestedAt: FIXTURE_NOW,
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get customerId() { return vo.customerId; },
    get status() { return vo.status; },
    get reason() { return vo.reason; },
    get itemIds() { return vo.itemIds; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as OrderReturnEntity;
}

export function makeFulfillmentEntityStub(overrides: Record<string, unknown> = {}): OrderFulfillmentEntity {
  const vo = {
    orderId: { value: FIXTURE_ID_2 },
    vendorId: { value: FIXTURE_ID },
    status: { value: 'unfulfilled' },
    itemIds: [FIXTURE_ID, FIXTURE_ID_2],
    trackingNumber: 'TRK-ABCD1234',
    courierId: FIXTURE_ID,
    warehouseId: FIXTURE_ID_2,
    fulfilledAt: undefined,
    deliveredAt: undefined,
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get status() { return vo.status; },
    get itemIds() { return vo.itemIds; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as OrderFulfillmentEntity;
}

export function makeTrackingEntityStub(overrides: Record<string, unknown> = {}): OrderTrackingEntity {
  const vo = {
    orderId: { value: FIXTURE_ID_2 },
    status: { value: 'in_transit' },
    trackingNumber: { value: 'TRK-ABCD1234' },
    message: 'Package in transit',
    location: 'Dhaka hub',
    carrier: 'Pathao',
    occurredAt: FIXTURE_NOW,
    ...overrides,
  };
  return {
    id: FIXTURE_ID,
    vo,
    get orderId() { return vo.orderId; },
    get status() { return vo.status; },
    get trackingNumber() { return vo.trackingNumber; },
    createdAt: FIXTURE_NOW,
    updatedAt: FIXTURE_NOW,
  } as unknown as OrderTrackingEntity;
}
