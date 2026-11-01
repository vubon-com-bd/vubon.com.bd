/**
 * Test Fixtures — Composite VOs
 * @module order-service/test/fixtures/domain
 */
import {
  fixtureOrderId,
  fixtureOrderNumber,
  fixtureCustomerId,
  fixtureOrderStatus,
  fixtureOrderChannel,
  fixtureOrderSource,
  fixtureOrderSubtotal,
  fixtureOrderDiscount,
  fixtureOrderTax,
  fixtureOrderShipping,
  fixtureOrderTotal,
  fixtureOrderItemId,
  fixtureProductId,
  fixtureItemQuantity,
  fixtureItemPrice,
  fixtureItemStatus,
  fixtureShippingAddressId,
  fixtureBillingAddressId,
} from './primitive-fixtures.js';
import { OrderVO } from '@domain/composites/order.vo.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { ShippingAddressVO } from '@domain/composites/shipping-address.vo.js';
import { BillingAddressVO } from '@domain/composites/billing-address.vo.js';

export const fixtureOrderVO = OrderVO.create({
  id: fixtureOrderId,
  orderNumber: fixtureOrderNumber,
  customerId: fixtureCustomerId,
  status: fixtureOrderStatus,
  channel: fixtureOrderChannel,
  source: fixtureOrderSource,
  subtotal: fixtureOrderSubtotal,
  discount: fixtureOrderDiscount,
  tax: fixtureOrderTax,
  shipping: fixtureOrderShipping,
  total: fixtureOrderTotal,
});

export const fixtureOrderItemVO = OrderItemVO.create({
  id: fixtureOrderItemId,
  orderId: fixtureOrderId,
  productId: fixtureProductId,
  name: 'Test Product',
  sku: 'SKU-001',
  quantity: fixtureItemQuantity,
  unitPrice: fixtureItemPrice,
  status: fixtureItemStatus,
});

export const fixtureShippingAddressVO = ShippingAddressVO.create({
  id: fixtureShippingAddressId,
  recipientName: 'John Doe',
  phone: '01712345678',
  line1: '123 Main Street',
  city: 'Dhaka',
  country: 'BD',
});

export const fixtureBillingAddressVO = BillingAddressVO.create({
  id: fixtureBillingAddressId,
  recipientName: 'John Doe',
  phone: '01712345678',
  line1: '123 Main Street',
  city: 'Dhaka',
  country: 'BD',
});
