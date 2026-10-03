/**
 * Application error classes — verify constructors + messages
 */
import * as OrderErrors from '../../../../src/module/application/errors/order.errors.js';
import * as OrderItemErrors from '../../../../src/module/application/errors/order-item.errors.js';
import * as CheckoutErrors from '../../../../src/module/application/errors/checkout.errors.js';
import * as DeliveryErrors from '../../../../src/module/application/errors/delivery.errors.js';
import * as CancelErrors from '../../../../src/module/application/errors/cancel.errors.js';
import * as ReturnErrors from '../../../../src/module/application/errors/return.errors.js';
import * as FulfillmentErrors from '../../../../src/module/application/errors/fulfillment.errors.js';
import * as TrackingErrors from '../../../../src/module/application/errors/tracking.errors.js';

describe('OrderErrors', () => {
  it('OrderNotFoundApplicationError', () => {
    const e = new OrderErrors.OrderNotFoundApplicationError('o1');
    expect(e.message).toContain('o1');
    expect(e.name).toBe('OrderNotFoundApplicationError');
  });
  it('OrderCreationError', () => {
    const e = new OrderErrors.OrderCreationError('reason');
    expect(e.message).toContain('reason');
  });
  it('OrderUpdateError', () => {
    const e = new OrderErrors.OrderUpdateError('o1', 'reason');
    expect(e.message).toContain('reason');
    expect(e.context).toHaveProperty('commandType', 'OrderUpdate');
  });
  it('OrderDeleteError', () => {
    const e = new OrderErrors.OrderDeleteError('o1', 'reason');
    expect(e.message).toContain('reason');
    expect(e.context).toHaveProperty('commandType', 'OrderDelete');
  });
  it('OrderNumberConflictError', () => {
    const e = new OrderErrors.OrderNumberConflictError('ORD-1');
    expect(e.message).toContain('ORD-1');
    expect(e.httpStatus).toBe(409);
  });
  it('OrderIdempotencyConflictError', () => {
    const e = new OrderErrors.OrderIdempotencyConflictError('key-1');
    expect(e.message).toContain('key-1');
    expect(e.httpStatus).toBe(409);
  });
  it('OrderValidationError', () => {
    const e = new OrderErrors.OrderValidationError('bad', 'field');
    expect(e.message).toBe('bad');
  });
});

describe('OrderItemErrors', () => {
  it('OrderItemNotFoundApplicationError', () => {
    expect(new OrderItemErrors.OrderItemNotFoundApplicationError('i1').message).toContain('i1');
  });
  it('OrderItemCreationError', () => {
    expect(new OrderItemErrors.OrderItemCreationError('reason').message).toContain('reason');
  });
  it('OrderItemUpdateError', () => {
    const e = new OrderItemErrors.OrderItemUpdateError('i1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('OrderItemRemoveError', () => {
    const e = new OrderItemErrors.OrderItemRemoveError('i1', 'reason');
    expect(e.message).toContain('reason');
  });
});

describe('CheckoutErrors', () => {
  it('CheckoutNotFoundApplicationError', () => {
    expect(new CheckoutErrors.CheckoutNotFoundApplicationError('c1').message).toContain('c1');
  });
  it('CheckoutStartError', () => {
    expect(new CheckoutErrors.CheckoutStartError('reason').message).toContain('reason');
  });
  it('CheckoutConfirmError', () => {
    const e = new CheckoutErrors.CheckoutConfirmError('c1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('CheckoutAbandonError', () => {
    const e = new CheckoutErrors.CheckoutAbandonError('c1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('CheckoutSessionNotFoundApplicationError', () => {
    expect(new CheckoutErrors.CheckoutSessionNotFoundApplicationError('s1').message).toContain('s1');
  });
  it('CheckoutSessionExpiredError', () => {
    const e = new CheckoutErrors.CheckoutSessionExpiredError('s1');
    expect(e.message).toContain('s1');
    expect(e.httpStatus).toBe(410);
  });
});

describe('DeliveryErrors', () => {
  it('DeliveryNotFoundApplicationError', () => {
    expect(new DeliveryErrors.DeliveryNotFoundApplicationError('d1').message).toContain('d1');
  });
  it('DeliveryScheduleError', () => {
    const e = new DeliveryErrors.DeliveryScheduleError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('DeliveryRescheduleError', () => {
    const e = new DeliveryErrors.DeliveryRescheduleError('d1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('DeliveryConfirmError', () => {
    const e = new DeliveryErrors.DeliveryConfirmError('d1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('DeliveryMethodNotFoundApplicationError', () => {
    expect(new DeliveryErrors.DeliveryMethodNotFoundApplicationError('m1').message).toContain('m1');
  });
});

describe('CancelErrors', () => {
  it('CancelNotFoundApplicationError', () => {
    expect(new CancelErrors.CancelNotFoundApplicationError('c1').message).toContain('c1');
  });
  it('CancelRequestError', () => {
    const e = new CancelErrors.CancelRequestError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('CancelApproveError', () => {
    const e = new CancelErrors.CancelApproveError('c1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('CancelRejectError', () => {
    const e = new CancelErrors.CancelRejectError('c1', 'reason');
    expect(e.message).toContain('reason');
  });
});

describe('ReturnErrors', () => {
  it('ReturnNotFoundApplicationError', () => {
    expect(new ReturnErrors.ReturnNotFoundApplicationError('r1').message).toContain('r1');
  });
  it('ReturnRequestError', () => {
    const e = new ReturnErrors.ReturnRequestError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('ReturnApproveError', () => {
    const e = new ReturnErrors.ReturnApproveError('r1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('ReturnRejectError', () => {
    const e = new ReturnErrors.ReturnRejectError('r1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('ReturnCompleteError', () => {
    const e = new ReturnErrors.ReturnCompleteError('r1', 'reason');
    expect(e.message).toContain('reason');
  });
});

describe('FulfillmentErrors', () => {
  it('FulfillmentNotFoundApplicationError', () => {
    expect(new FulfillmentErrors.FulfillmentNotFoundApplicationError('f1').message).toContain('f1');
  });
  it('FulfillmentStartError', () => {
    const e = new FulfillmentErrors.FulfillmentStartError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('FulfillmentPackError', () => {
    const e = new FulfillmentErrors.FulfillmentPackError('f1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('FulfillmentShipError', () => {
    const e = new FulfillmentErrors.FulfillmentShipError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('FulfillmentCompleteError', () => {
    const e = new FulfillmentErrors.FulfillmentCompleteError('f1', 'reason');
    expect(e.message).toContain('reason');
  });
});

describe('TrackingErrors', () => {
  it('TrackingNotFoundApplicationError', () => {
    expect(new TrackingErrors.TrackingNotFoundApplicationError('t1').message).toContain('t1');
  });
  it('TrackingAddError', () => {
    const e = new TrackingErrors.TrackingAddError('o1', 'reason');
    expect(e.message).toContain('reason');
  });
  it('TrackingUpdateError', () => {
    const e = new TrackingErrors.TrackingUpdateError('t1', 'reason');
    expect(e.message).toContain('reason');
  });
});
