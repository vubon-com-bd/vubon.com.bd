/**
 * Domain error classes — verify constructors + name + context
 */
import * as OrderErrors from '../../../../src/module/domain/errors/order.errors.js';
import * as OrderItemErrors from '../../../../src/module/domain/errors/order-item.errors.js';
import * as CheckoutErrors from '../../../../src/module/domain/errors/checkout.errors.js';
import * as DeliveryErrors from '../../../../src/module/domain/errors/delivery.errors.js';
import * as CancelErrors from '../../../../src/module/domain/errors/order-cancel.errors.js';
import * as ReturnErrors from '../../../../src/module/domain/errors/order-return.errors.js';
import * as FulfillmentErrors from '../../../../src/module/domain/errors/order-fulfillment.errors.js';
import * as TrackingErrors from '../../../../src/module/domain/errors/order-tracking.errors.js';

describe('Order domain errors', () => {
  it('OrderNotFoundError', () => {
    const e = new OrderErrors.OrderNotFoundError('o1');
    expect(e.name).toBe('OrderNotFoundError');
    expect(e.entityType).toBe('Order');
  });
  it('OrderAlreadyExistsError', () => {
    expect(new OrderErrors.OrderAlreadyExistsError('ORD-1').message).toContain('ORD-1');
  });
  it('InvalidOrderStatusError', () => {
    const e = new OrderErrors.InvalidOrderStatusError('bogus', ['pending', 'confirmed']);
    expect(e.message).toContain('bogus');
    expect(e.field).toBe('status');
  });
  it('InvalidOrderTypeError', () => {
    expect(new OrderErrors.InvalidOrderTypeError('x', ['regular']).message).toContain('x');
  });
  it('InvalidOrderPriorityError', () => {
    expect(new OrderErrors.InvalidOrderPriorityError('x', ['low']).message).toContain('x');
  });
  it('InvalidOrderNumberError', () => {
    expect(new OrderErrors.InvalidOrderNumberError('bad').message).toContain('bad');
  });
  it('InvalidStatusTransitionError', () => {
    const e = new OrderErrors.InvalidStatusTransitionError('pending', 'delivered');
    expect(e.message).toContain('pending');
    expect(e.message).toContain('delivered');
    expect(e.rule).toBe('INVALID_STATUS_TRANSITION');
  });
  it('OrderTotalMismatchError', () => {
    const e = new OrderErrors.OrderTotalMismatchError(100, 200);
    expect(e.rule).toBe('ORDER_TOTAL_MISMATCH');
  });
  it('OrderCannotBeModifiedError', () => {
    const e = new OrderErrors.OrderCannotBeModifiedError('o1', 'shipped');
    expect(e.rule).toBe('ORDER_NOT_MODIFIABLE');
  });
});

describe('OrderItem domain errors', () => {
  it('OrderItemNotFoundError', () => {
    expect(new OrderItemErrors.OrderItemNotFoundError('i1').name).toBe('OrderItemNotFoundError');
  });
  it('InvalidQuantityError', () => {
    expect(new OrderItemErrors.InvalidQuantityError('bad').field).toBe('quantity');
  });
  it('InvalidPriceError', () => {
    expect(new OrderItemErrors.InvalidPriceError('bad').field).toBe('price');
  });
  it('InvalidOrderItemStatusError', () => {
    expect(new OrderItemErrors.InvalidOrderItemStatusError('x', ['pending']).message).toContain('x');
  });
  it('InvalidOrderItemTypeError', () => {
    expect(new OrderItemErrors.InvalidOrderItemTypeError('x', ['product']).message).toContain('x');
  });
  it('ItemAlreadyExistsError', () => {
    const e = new OrderItemErrors.ItemAlreadyExistsError('p1', 'v1');
    expect(e.message).toContain('p1');
    expect(e.message).toContain('v1');
  });
  it('ItemLimitExceededError', () => {
    const e = new OrderItemErrors.ItemLimitExceededError(150, 100);
    expect(e.rule).toBe('ORDER_ITEM_LIMIT_EXCEEDED');
  });
});

describe('Checkout domain errors', () => {
  it('CheckoutNotFoundError', () => {
    expect(new CheckoutErrors.CheckoutNotFoundError('c1').name).toBe('CheckoutNotFoundError');
  });
  it('CheckoutExpiredError', () => {
    expect(new CheckoutErrors.CheckoutExpiredError('c1').rule).toBe('CHECKOUT_EXPIRED');
  });
  it('CheckoutIncompleteError', () => {
    expect(new CheckoutErrors.CheckoutIncompleteError('c1', 'payment').rule).toBe('CHECKOUT_INCOMPLETE');
  });
  it('InvalidCheckoutStatusError', () => {
    expect(new CheckoutErrors.InvalidCheckoutStatusError('x', ['pending']).message).toContain('x');
  });
  it('InvalidCheckoutStepError', () => {
    expect(new CheckoutErrors.InvalidCheckoutStepError('x', ['cart_review']).message).toContain('x');
  });
  it('InvalidCheckoutTypeError', () => {
    expect(new CheckoutErrors.InvalidCheckoutTypeError('x', ['guest']).message).toContain('x');
  });
});

describe('Delivery domain errors', () => {
  it('DeliveryNotFoundError', () => {
    expect(new DeliveryErrors.DeliveryNotFoundError('d1').name).toBe('DeliveryNotFoundError');
  });
  it('DeliveryNotAvailableError', () => {
    expect(new DeliveryErrors.DeliveryNotAvailableError('reason').rule).toBe('DELIVERY_NOT_AVAILABLE');
  });
  it('InvalidDeliveryStatusError', () => {
    expect(new DeliveryErrors.InvalidDeliveryStatusError('x', ['scheduled']).message).toContain('x');
  });
  it('InvalidDeliveryAddressError', () => {
    expect(new DeliveryErrors.InvalidDeliveryAddressError('bad').field).toBe('address');
  });
  it('DeliveryAlreadyExistsError', () => {
    expect(new DeliveryErrors.DeliveryAlreadyExistsError('o1').rule).toBe('DELIVERY_ALREADY_EXISTS');
  });
});

describe('OrderCancel domain errors', () => {
  it('CancelNotFoundError', () => {
    expect(new CancelErrors.CancelNotFoundError('c1').name).toBe('CancelNotFoundError');
  });
  it('CancelWindowExpiredError', () => {
    expect(new CancelErrors.CancelWindowExpiredError('o1').rule).toBe('CANCEL_WINDOW_EXPIRED');
  });
  it('CannotCancelError', () => {
    expect(new CancelErrors.CannotCancelError('o1', 'reason').rule).toBe('CANNOT_CANCEL');
  });
  it('CancelAlreadyProcessedError', () => {
    expect(new CancelErrors.CancelAlreadyProcessedError('c1', 'approved').rule).toBe('CANCEL_ALREADY_PROCESSED');
  });
  it('InvalidCancelStatusError', () => {
    expect(new CancelErrors.InvalidCancelStatusError('x', ['requested']).message).toContain('x');
  });
  it('InvalidCancelReasonError', () => {
    expect(new CancelErrors.InvalidCancelReasonError('x', ['customer_request']).message).toContain('x');
  });
});

describe('OrderReturn domain errors', () => {
  it('ReturnNotFoundError', () => {
    expect(new ReturnErrors.ReturnNotFoundError('r1').name).toBe('ReturnNotFoundError');
  });
  it('ReturnWindowExpiredError', () => {
    expect(new ReturnErrors.ReturnWindowExpiredError('o1').rule).toBe('RETURN_WINDOW_EXPIRED');
  });
  it('CannotReturnError', () => {
    expect(new ReturnErrors.CannotReturnError('o1', 'reason').rule).toBe('CANNOT_RETURN');
  });
  it('ReturnAlreadyProcessedError', () => {
    expect(new ReturnErrors.ReturnAlreadyProcessedError('r1', 'approved').rule).toBe('RETURN_ALREADY_PROCESSED');
  });
  it('InvalidReturnStatusError', () => {
    expect(new ReturnErrors.InvalidReturnStatusError('x', ['requested']).message).toContain('x');
  });
  it('InvalidReturnReasonError', () => {
    expect(new ReturnErrors.InvalidReturnReasonError('x', ['defective']).message).toContain('x');
  });
});

describe('OrderFulfillment domain errors', () => {
  it('FulfillmentNotFoundError', () => {
    expect(new FulfillmentErrors.FulfillmentNotFoundError('f1').name).toBe('FulfillmentNotFoundError');
  });
  it('FulfillmentFailedError', () => {
    expect(new FulfillmentErrors.FulfillmentFailedError('o1', 'reason').rule).toBe('FULFILLMENT_FAILED');
  });
  it('AllocationFailedError', () => {
    expect(new FulfillmentErrors.AllocationFailedError(['i1'], 'reason').rule).toBe('ALLOCATION_FAILED');
  });
  it('InvalidFulfillmentStatusError', () => {
    expect(new FulfillmentErrors.InvalidFulfillmentStatusError('x', ['unfulfilled']).message).toContain('x');
  });
  it('InvalidFulfillmentTypeError', () => {
    expect(new FulfillmentErrors.InvalidFulfillmentTypeError('x', ['standard']).message).toContain('x');
  });
});

describe('OrderTracking domain errors', () => {
  it('TrackingNotFoundError', () => {
    expect(new TrackingErrors.TrackingNotFoundError('t1').name).toBe('TrackingNotFoundError');
  });
  it('InvalidTrackingStatusError', () => {
    expect(new TrackingErrors.InvalidTrackingStatusError('x', ['order_placed']).message).toContain('x');
  });
  it('InvalidTrackingEventError', () => {
    expect(new TrackingErrors.InvalidTrackingEventError('x', ['order_placed']).message).toContain('x');
  });
  it('TrackingNumberExistsError', () => {
    const e = new TrackingErrors.TrackingNumberExistsError('TRK-1');
    expect(e.message).toContain('TRK-1');
  });
});
