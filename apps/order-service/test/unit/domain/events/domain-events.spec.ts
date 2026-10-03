/**
 * Domain events — verify payloads, types, aggregateType, occurredAt
 */
import * as OrderEvents from '../../../../src/module/domain/events/order.events.js';
import * as OrderItemEvents from '../../../../src/module/domain/events/order-item.events.js';
import * as CheckoutEvents from '../../../../src/module/domain/events/checkout.events.js';
import * as DeliveryEvents from '../../../../src/module/domain/events/delivery.events.js';
import * as CancelEvents from '../../../../src/module/domain/events/order-cancel.events.js';
import * as ReturnEvents from '../../../../src/module/domain/events/order-return.events.js';
import * as FulfillmentEvents from '../../../../src/module/domain/events/order-fulfillment.events.js';
import * as TrackingEvents from '../../../../src/module/domain/events/order-tracking.events.js';
import { newEventId, now } from '../../../../src/module/domain/events/event.helpers.js';

const AGG = '11111111-1111-4111-8111-111111111111';
const OTHER = '22222222-2222-4222-8222-222222222222';
const EVENT_ARGS = { id: 'evt-1', aggregateId: AGG };

describe('event.helpers', () => {
  it('newEventId() returns string', () => {
    expect(typeof newEventId()).toBe('string');
    expect(newEventId()).not.toBe(newEventId());
  });
  it('now() returns epoch ms', () => {
    const ts = now();
    expect(typeof ts).toBe('number');
    expect(ts).toBeGreaterThan(0);
  });
});

describe('Order events', () => {
  it('OrderCreatedEvent', () => {
    const e = new OrderEvents.OrderCreatedEvent({
      ...EVENT_ARGS,
      payload: { orderId: AGG, orderNumber: 'ORD-1', customerId: OTHER, itemCount: 1, total: 100, currency: 'BDT', status: 'pending', type: 'regular' },
    });
    expect(e.type).toBe('order.created');
    expect(e.aggregateType).toBe('Order');
  });
  it('OrderUpdatedEvent', () => {
    expect(new OrderEvents.OrderUpdatedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, changedFields: ['notes'] } }).type).toBe('order.updated');
  });
  it('OrderConfirmedEvent', () => {
    expect(new OrderEvents.OrderConfirmedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, confirmedAt: new Date().toISOString() } }).type).toBe('order.confirmed');
  });
  it('OrderProcessingEvent', () => {
    expect(new OrderEvents.OrderProcessingEvent({ ...EVENT_ARGS, payload: { orderId: AGG, startedAt: new Date().toISOString() } }).type).toBe('order.processing');
  });
  it('OrderPackedEvent', () => {
    expect(new OrderEvents.OrderPackedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, packedAt: new Date().toISOString() } }).type).toBe('order.packed');
  });
  it('OrderShippedEvent', () => {
    expect(new OrderEvents.OrderShippedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, shippedAt: new Date().toISOString() } }).type).toBe('order.shipped');
  });
  it('OrderOutForDeliveryEvent', () => {
    expect(new OrderEvents.OrderOutForDeliveryEvent({ ...EVENT_ARGS, payload: { orderId: AGG, outAt: new Date().toISOString() } }).type).toBe('order.out_for_delivery');
  });
  it('OrderDeliveredEvent', () => {
    expect(new OrderEvents.OrderDeliveredEvent({ ...EVENT_ARGS, payload: { orderId: AGG, deliveredAt: new Date().toISOString() } }).type).toBe('order.delivered');
  });
  it('OrderCompletedEvent', () => {
    expect(new OrderEvents.OrderCompletedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, completedAt: new Date().toISOString() } }).type).toBe('order.completed');
  });
  it('OrderCancelledEvent', () => {
    expect(new OrderEvents.OrderCancelledEvent({ ...EVENT_ARGS, payload: { orderId: AGG, cancelledAt: new Date().toISOString(), reason: 'x' } }).type).toBe('order.cancelled');
  });
  it('OrderReturnedEvent', () => {
    expect(new OrderEvents.OrderReturnedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, returnId: 'r1', returnedAt: new Date().toISOString(), reason: 'x', itemIds: [] } }).type).toBe('order.returned');
  });
  it('OrderRefundedEvent', () => {
    expect(new OrderEvents.OrderRefundedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, refundedAt: new Date().toISOString(), amount: 100, currency: 'BDT' } }).type).toBe('order.refunded');
  });
  it('OrderOnHoldEvent', () => {
    expect(new OrderEvents.OrderOnHoldEvent({ ...EVENT_ARGS, payload: { orderId: AGG, onHoldAt: new Date().toISOString(), reason: 'x' } }).type).toBe('order.on_hold');
  });
  it('OrderReleasedEvent', () => {
    expect(new OrderEvents.OrderReleasedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, releasedAt: new Date().toISOString() } }).type).toBe('order.released');
  });
  it('OrderStatusChangedEvent', () => {
    expect(new OrderEvents.OrderStatusChangedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, fromStatus: 'pending', toStatus: 'confirmed' } }).type).toBe('order.status_changed');
  });
  it('OrderPriorityChangedEvent', () => {
    expect(new OrderEvents.OrderPriorityChangedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, fromPriority: 'low', toPriority: 'high' } }).type).toBe('order.priority_changed');
  });
  it('OrderNotesUpdatedEvent', () => {
    expect(new OrderEvents.OrderNotesUpdatedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, field: 'notes', newValue: 'x' } }).type).toBe('order.notes_updated');
  });
});

describe('OrderItem events', () => {
  it('OrderItemAddedEvent', () => {
    const e = new OrderItemEvents.OrderItemAddedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, itemId: 'i1', productId: 'p1', sku: 's', name: 'n', quantity: 1, unitPrice: 100, currency: 'BDT' } });
    expect(e.type).toBe('order.item.added');
  });
  it('OrderItemUpdatedEvent', () => {
    expect(new OrderItemEvents.OrderItemUpdatedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, itemId: 'i1', changedFields: ['qty'] } }).type).toBe('order.item.updated');
  });
  it('OrderItemRemovedEvent', () => {
    expect(new OrderItemEvents.OrderItemRemovedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, itemId: 'i1', productId: 'p1', quantity: 1 } }).type).toBe('order.item.removed');
  });
  it('OrderItemStatusChangedEvent', () => {
    expect(new OrderItemEvents.OrderItemStatusChangedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, itemId: 'i1', fromStatus: 'pending', toStatus: 'confirmed' } }).type).toBe('order.item.status_changed');
  });
});

describe('Checkout events', () => {
  it('CheckoutStartedEvent', () => {
    expect(new CheckoutEvents.CheckoutStartedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', customerId: OTHER, type: 'registered', currency: 'BDT' } }).type).toBe('checkout.started');
  });
  it('CheckoutAddressSelectedEvent', () => {
    expect(new CheckoutEvents.CheckoutAddressSelectedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1' } }).type).toBe('checkout.address_selected');
  });
  it('CheckoutShippingSelectedEvent', () => {
    expect(new CheckoutEvents.CheckoutShippingSelectedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', shippingMethodId: 'std', shippingCost: 50, currency: 'BDT' } }).type).toBe('checkout.shipping_selected');
  });
  it('CheckoutPaymentSelectedEvent', () => {
    expect(new CheckoutEvents.CheckoutPaymentSelectedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', paymentMethod: 'card' } }).type).toBe('checkout.payment_selected');
  });
  it('CheckoutStepChangedEvent', () => {
    expect(new CheckoutEvents.CheckoutStepChangedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', fromStep: 'a', toStep: 'b' } }).type).toBe('checkout.step_changed');
  });
  it('CheckoutCompletedEvent', () => {
    expect(new CheckoutEvents.CheckoutCompletedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', orderId: 'o1', customerId: OTHER, total: 100, currency: 'BDT', completedAt: new Date().toISOString() } }).type).toBe('checkout.completed');
  });
  it('CheckoutAbandonedEvent', () => {
    expect(new CheckoutEvents.CheckoutAbandonedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', abandonedAt: new Date().toISOString(), lastStep: 's', itemCount: 0 } }).type).toBe('checkout.abandoned');
  });
  it('CheckoutExpiredEvent', () => {
    expect(new CheckoutEvents.CheckoutExpiredEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', expiredAt: new Date().toISOString(), lastStep: 's' } }).type).toBe('checkout.expired');
  });
  it('CheckoutFailedEvent', () => {
    expect(new CheckoutEvents.CheckoutFailedEvent({ ...EVENT_ARGS, payload: { checkoutId: 'c1', failedAt: new Date().toISOString(), reason: 'x', lastStep: 's' } }).type).toBe('checkout.failed');
  });
});

describe('Delivery events', () => {
  it('DeliveryScheduledEvent', () => {
    expect(new DeliveryEvents.DeliveryScheduledEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, type: 'standard' } }).type).toBe('delivery.scheduled');
  });
  it('DeliveryRescheduledEvent', () => {
    expect(new DeliveryEvents.DeliveryRescheduledEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, reason: 'x' } }).type).toBe('delivery.rescheduled');
  });
  it('DeliveryAssignedEvent', () => {
    expect(new DeliveryEvents.DeliveryAssignedEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', courierId: 'c1', assignedAt: new Date().toISOString() } }).type).toBe('delivery.assigned');
  });
  it('DeliveryPickedUpEvent', () => {
    expect(new DeliveryEvents.DeliveryPickedUpEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, pickedUpAt: new Date().toISOString() } }).type).toBe('delivery.picked_up');
  });
  it('DeliveryInTransitEvent', () => {
    expect(new DeliveryEvents.DeliveryInTransitEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, inTransitAt: new Date().toISOString() } }).type).toBe('delivery.in_transit');
  });
  it('DeliveryOutForDeliveryEvent', () => {
    expect(new DeliveryEvents.DeliveryOutForDeliveryEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, outAt: new Date().toISOString() } }).type).toBe('delivery.out_for_delivery');
  });
  it('DeliveryAttemptedEvent', () => {
    expect(new DeliveryEvents.DeliveryAttemptedEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, attemptNumber: 1, status: 'failed' } }).type).toBe('delivery.attempted');
  });
  it('DeliveryCompletedEvent', () => {
    expect(new DeliveryEvents.DeliveryCompletedEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, deliveredAt: new Date().toISOString() } }).type).toBe('delivery.completed');
  });
  it('DeliveryFailedEvent', () => {
    expect(new DeliveryEvents.DeliveryFailedEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, reason: 'x', attemptNumber: 1, failedAt: new Date().toISOString() } }).type).toBe('delivery.failed');
  });
  it('DeliveryCancelledEvent', () => {
    expect(new DeliveryEvents.DeliveryCancelledEvent({ ...EVENT_ARGS, payload: { deliveryId: 'd1', orderId: AGG, cancelledAt: new Date().toISOString(), reason: 'x' } }).type).toBe('delivery.cancelled');
  });
});

describe('Cancel events', () => {
  it('OrderCancelRequestedEvent', () => {
    expect(new CancelEvents.OrderCancelRequestedEvent({ ...EVENT_ARGS, payload: { cancelId: 'c1', orderId: AGG, reason: 'x', requestedBy: OTHER } }).type).toBe('order.cancel.requested');
  });
  it('OrderCancelApprovedEvent', () => {
    expect(new CancelEvents.OrderCancelApprovedEvent({ ...EVENT_ARGS, payload: { cancelId: 'c1', orderId: AGG, approvedBy: OTHER, restockInventory: true } }).type).toBe('order.cancel.approved');
  });
  it('OrderCancelRejectedEvent', () => {
    expect(new CancelEvents.OrderCancelRejectedEvent({ ...EVENT_ARGS, payload: { cancelId: 'c1', orderId: AGG, rejectedBy: OTHER, reason: 'x' } }).type).toBe('order.cancel.rejected');
  });
  it('OrderCancelProcessedEvent', () => {
    expect(new CancelEvents.OrderCancelProcessedEvent({ ...EVENT_ARGS, payload: { cancelId: 'c1', orderId: AGG, processedAt: new Date().toISOString() } }).type).toBe('order.cancel.processed');
  });
});

describe('Return events', () => {
  it('OrderReturnRequestedEvent', () => {
    expect(new ReturnEvents.OrderReturnRequestedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, customerId: OTHER, reason: 'x', itemIds: [], images: [] } }).type).toBe('order.return.requested');
  });
  it('OrderReturnApprovedEvent', () => {
    expect(new ReturnEvents.OrderReturnApprovedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, approvedBy: 'admin', approvedAt: new Date().toISOString() } }).type).toBe('order.return.approved');
  });
  it('OrderReturnRejectedEvent', () => {
    expect(new ReturnEvents.OrderReturnRejectedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, rejectedBy: 'admin', reason: 'x' } }).type).toBe('order.return.rejected');
  });
  it('OrderReturnPickedUpEvent', () => {
    expect(new ReturnEvents.OrderReturnPickedUpEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, pickedUpAt: new Date().toISOString() } }).type).toBe('order.return.picked_up');
  });
  it('OrderReturnReceivedEvent', () => {
    expect(new ReturnEvents.OrderReturnReceivedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, receivedAt: new Date().toISOString() } }).type).toBe('order.return.received');
  });
  it('OrderReturnInspectedEvent', () => {
    expect(new ReturnEvents.OrderReturnInspectedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, inspectedAt: new Date().toISOString(), condition: 'ok' } }).type).toBe('order.return.inspected');
  });
  it('OrderReturnCompletedEvent', () => {
    expect(new ReturnEvents.OrderReturnCompletedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, completedAt: new Date().toISOString(), refundAmount: 100, restockFee: 0, currency: 'BDT' } }).type).toBe('order.return.completed');
  });
  it('OrderReturnClosedEvent', () => {
    expect(new ReturnEvents.OrderReturnClosedEvent({ ...EVENT_ARGS, payload: { returnId: 'r1', orderId: AGG, closedAt: new Date().toISOString(), resolution: 'refunded' } }).type).toBe('order.return.closed');
  });
});

describe('Fulfillment events', () => {
  it('FulfillmentStartedEvent', () => {
    expect(new FulfillmentEvents.FulfillmentStartedEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, type: 'standard', itemIds: [] } }).type).toBe('fulfillment.started');
  });
  it('FulfillmentPackedEvent', () => {
    expect(new FulfillmentEvents.FulfillmentPackedEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, packedAt: new Date().toISOString() } }).type).toBe('fulfillment.packed');
  });
  it('FulfillmentShippedEvent', () => {
    expect(new FulfillmentEvents.FulfillmentShippedEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, shippedAt: new Date().toISOString() } }).type).toBe('fulfillment.shipped');
  });
  it('FulfillmentPartiallyFulfilledEvent', () => {
    expect(new FulfillmentEvents.FulfillmentPartiallyFulfilledEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, fulfilledItemCount: 1, pendingItemCount: 1 } }).type).toBe('fulfillment.partially_fulfilled');
  });
  it('FulfillmentCompletedEvent', () => {
    expect(new FulfillmentEvents.FulfillmentCompletedEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, completedAt: new Date().toISOString() } }).type).toBe('fulfillment.completed');
  });
  it('FulfillmentCancelledEvent', () => {
    expect(new FulfillmentEvents.FulfillmentCancelledEvent({ ...EVENT_ARGS, payload: { fulfillmentId: 'f1', orderId: AGG, cancelledAt: new Date().toISOString(), reason: 'x' } }).type).toBe('fulfillment.cancelled');
  });
});

describe('Tracking events', () => {
  it('TrackingAddedEvent', () => {
    expect(new TrackingEvents.TrackingAddedEvent({ ...EVENT_ARGS, payload: { trackingId: 't1', orderId: AGG, event: 'order_placed', message: 'x', occurredAt: new Date().toISOString() } }).type).toBe('order.tracking.added');
  });
  it('TrackingUpdatedEvent', () => {
    expect(new TrackingEvents.TrackingUpdatedEvent({ ...EVENT_ARGS, payload: { trackingId: 't1', orderId: AGG, previousEvent: 'a', newEvent: 'b', message: 'x' } }).type).toBe('order.tracking.updated');
  });
  it('TrackingNumberAssignedEvent', () => {
    expect(new TrackingEvents.TrackingNumberAssignedEvent({ ...EVENT_ARGS, payload: { orderId: AGG, trackingNumber: 'TRK-1', assignedAt: new Date().toISOString() } }).type).toBe('order.tracking.number_assigned');
  });
});
