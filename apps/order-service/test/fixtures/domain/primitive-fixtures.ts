/**
 * Test Fixtures — Primitive VOs
 * @module order-service/test/fixtures/domain
 *
 * Reusable VO instances for composite VO tests.
 */
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { OrderNumberVO } from '@domain/primitives/order-number.vo.js';
import { OrderStatusVO } from '@domain/primitives/order-status.vo.js';
import { OrderChannelVO } from '@domain/primitives/order-channel.vo.js';
import { OrderSourceVO } from '@domain/primitives/order-source.vo.js';
import { OrderTotalVO } from '@domain/primitives/order-total.vo.js';
import { OrderSubtotalVO } from '@domain/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '@domain/primitives/order-discount.vo.js';
import { OrderTaxVO } from '@domain/primitives/order-tax.vo.js';
import { OrderShippingVO } from '@domain/primitives/order-shipping.vo.js';
import { CustomerIdVO } from '@domain/primitives/customer-id.vo.js';
import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { VendorIdVO } from '@domain/primitives/vendor-id.vo.js';
import { VariantIdVO } from '@domain/primitives/variant-id.vo.js';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo.js';
import { OrderItemIdVO } from '@domain/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import { CheckoutIdVO } from '@domain/primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { DeliveryIdVO } from '@domain/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '@domain/primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '@domain/primitives/delivery-method-type.vo.js';
import { ShippingAddressIdVO } from '@domain/primitives/shipping-address-id.vo.js';
import { BillingAddressIdVO } from '@domain/primitives/billing-address-id.vo.js';
import { CancelIdVO } from '@domain/primitives/cancel-id.vo.js';
import { CancelReasonVO } from '@domain/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '@domain/primitives/cancel-status.vo.js';
import { ReturnIdVO } from '@domain/primitives/return-id.vo.js';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '@domain/primitives/return-status.vo.js';
import { FulfillmentIdVO } from '@domain/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '@domain/primitives/fulfillment-status.vo.js';
import { HistoryIdVO } from '@domain/primitives/history-id.vo.js';
import { HistoryTypeVO } from '@domain/primitives/history-type.vo.js';
import { TrackingIdVO } from '@domain/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '@domain/primitives/tracking-status.vo.js';
import { TrackingNumberVO } from '@domain/primitives/tracking-number.vo.js';

export const UUID_1 = '550e8400-e29b-41d4-a716-446655440000';
export const UUID_2 = '660f9511-f3ac-52e5-b827-557766551111';
export const UUID_3 = '770a0622-a4bd-63f6-c938-668877662222';

export const fixtureOrderId = OrderIdVO.create(UUID_1);
export const fixtureOrderNumber = OrderNumberVO.create('ORD-2024-000123');
export const fixtureCustomerId = CustomerIdVO.create(UUID_2);
export const fixtureProductId = ProductIdVO.create(UUID_3);
export const fixtureVendorId = VendorIdVO.create(UUID_1);
export const fixtureVariantId = VariantIdVO.create(UUID_2);
export const fixturePaymentId = PaymentIdVO.create(UUID_3);
export const fixtureOrderItemId = OrderItemIdVO.create(UUID_1);
export const fixtureCheckoutId = CheckoutIdVO.create(UUID_1);
export const fixtureDeliveryId = DeliveryIdVO.create(UUID_1);
export const fixtureDeliveryMethodId = DeliveryMethodIdVO.create(UUID_2);
export const fixtureShippingAddressId = ShippingAddressIdVO.create(UUID_1);
export const fixtureBillingAddressId = BillingAddressIdVO.create(UUID_2);
export const fixtureCancelId = CancelIdVO.create(UUID_1);
export const fixtureReturnId = ReturnIdVO.create(UUID_1);
export const fixtureFulfillmentId = FulfillmentIdVO.create(UUID_1);
export const fixtureHistoryId = HistoryIdVO.create(UUID_1);
export const fixtureTrackingId = TrackingIdVO.create(UUID_1);
export const fixtureTrackingNumber = TrackingNumberVO.create('TRK-ABCD1234');

export const fixtureOrderStatus = OrderStatusVO.pending();
export const fixtureOrderChannel = OrderChannelVO.create('web');
export const fixtureOrderSource = OrderSourceVO.create('customer');
export const fixtureOrderSubtotal = OrderSubtotalVO.create(1000, 'BDT');
export const fixtureOrderDiscount = OrderDiscountVO.none('BDT');
export const fixtureOrderTax = OrderTaxVO.none('BDT');
export const fixtureOrderShipping = OrderShippingVO.free('BDT');
export const fixtureOrderTotal = OrderTotalVO.create(1000, 'BDT');

export const fixtureItemQuantity = OrderItemQuantityVO.create(2);
export const fixtureItemPrice = OrderItemPriceVO.create(500, 'BDT');
export const fixtureItemStatus = OrderItemStatusVO.pending();

export const fixtureCheckoutStatus = CheckoutStatusVO.started();
export const fixtureCheckoutStep = CheckoutStepVO.cart();

export const fixtureDeliveryStatus = DeliveryStatusVO.pending();
export const fixtureDeliveryType = DeliveryTypeVO.create('standard');
export const fixtureDeliveryMethodType = DeliveryMethodTypeVO.create('flat_rate');

export const fixtureCancelReason = CancelReasonVO.create('customer_request');
export const fixtureCancelStatus = CancelStatusVO.requested();

export const fixtureReturnReason = ReturnReasonVO.create('defective');
export const fixtureReturnStatus = ReturnStatusVO.requested();

export const fixtureFulfillmentStatus = FulfillmentStatusVO.unfulfilled();
export const fixtureHistoryType = HistoryTypeVO.create('created');
export const fixtureTrackingStatus = TrackingStatusVO.create('pending');
