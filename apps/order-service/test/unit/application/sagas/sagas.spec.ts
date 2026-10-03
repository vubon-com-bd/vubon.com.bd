/**
 * Saga smoke tests — each saga listens to events$ and emits commands
 * via CommandBus. We verify the observable pipeline emits expected commands.
 */
import { jest } from '@jest/globals';
import { Subject, firstValueFrom } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { OrderCheckoutSaga } from '../../../../src/module/application/sagas/order-checkout.saga.js';
import { OrderPaymentSaga } from '../../../../src/module/application/sagas/order-payment.saga.js';
import { OrderFulfillmentSaga } from '../../../../src/module/application/sagas/order-fulfillment.saga.js';
import { OrderShippingSaga } from '../../../../src/module/application/sagas/order-shipping.saga.js';
import { OrderDeliverySaga } from '../../../../src/module/application/sagas/order-delivery.saga.js';
import { OrderCancelSaga } from '../../../../src/module/application/sagas/order-cancel.saga.js';
import { OrderReturnSaga } from '../../../../src/module/application/sagas/order-return.saga.js';
import { ALL_SAGAS } from '../../../../src/module/application/sagas/index.js';

import { CheckoutCompletedEvent, CheckoutAbandonedEvent } from '../../../../src/module/domain/events/checkout.events.js';
import { OrderCreatedEvent, OrderConfirmedEvent, OrderCompletedEvent, OrderShippedEvent, OrderPackedEvent, OrderDeliveredEvent, OrderCancelledEvent } from '../../../../src/module/domain/events/order.events.js';
import { OrderReturnRequestedEvent, OrderReturnCompletedEvent } from '../../../../src/module/domain/events/order-return.events.js';

const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';

function makeCommandBus() {
  return { execute: jest.fn().mockResolvedValue(undefined) };
}

describe('OrderCheckoutSaga', () => {
  let saga: OrderCheckoutSaga;
  let bus: ReturnType<typeof makeCommandBus>;

  beforeEach(() => {
    bus = makeCommandBus();
    saga = new OrderCheckoutSaga(bus as unknown as CommandBus);
  });

  it('onCheckoutCompleted → SendOrderEmailCommand', async () => {
    const subject = new Subject<unknown>();
    const obs = saga.onCheckoutCompleted(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new CheckoutCompletedEvent({
      aggregateId: UUID_CHECKOUT,
      payload: {
        checkoutId: UUID_CHECKOUT,
        orderId: UUID_ORDER,
        customerId: UUID_CUSTOMER,
        total: 100,
        currency: 'BDT',
        completedAt: new Date().toISOString(),
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('SendOrderEmailCommand');
  });

  it('onCheckoutAbandoned → UpdateAnalyticsCommand', async () => {
    const subject = new Subject<unknown>();
    const obs = saga.onCheckoutAbandoned(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new CheckoutAbandonedEvent({
      aggregateId: UUID_CHECKOUT,
      payload: {
        checkoutId: UUID_CHECKOUT,
        abandonedAt: new Date().toISOString(),
        lastStep: 'payment_method',
        itemCount: 2,
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('UpdateAnalyticsCommand');
  });
});

describe('OrderPaymentSaga', () => {
  it('onOrderCreated → NotifyCustomerCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderPaymentSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderCreated(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderCreatedEvent({
      aggregateId: UUID_ORDER,
      payload: {
        orderId: UUID_ORDER,
        orderNumber: 'ORD-2026-000001',
        customerId: UUID_CUSTOMER,
        itemCount: 1,
        total: 100,
        currency: 'BDT',
        status: 'pending',
        type: 'regular',
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('NotifyCustomerCommand');
  });
});

describe('OrderFulfillmentSaga', () => {
  it('onOrderConfirmed → NotifyCustomerCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderFulfillmentSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderConfirmed(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderConfirmedEvent({
      aggregateId: UUID_ORDER,
      payload: { orderId: UUID_ORDER, confirmedAt: new Date().toISOString() },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('NotifyCustomerCommand');
  });

  it('onOrderCompleted → UpdateAnalyticsCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderFulfillmentSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderCompleted(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderCompletedEvent({
      aggregateId: UUID_ORDER,
      payload: { orderId: UUID_ORDER, completedAt: new Date().toISOString() },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('UpdateAnalyticsCommand');
  });
});

describe('OrderShippingSaga', () => {
  it('onOrderPacked → NotifyCustomerCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderShippingSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderPacked(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderPackedEvent({
      aggregateId: UUID_ORDER,
      payload: { orderId: UUID_ORDER, packedAt: new Date().toISOString() },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('NotifyCustomerCommand');
  });

  it('onOrderShipped → SendOrderEmailCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderShippingSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderShipped(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderShippedEvent({
      aggregateId: UUID_ORDER,
      payload: {
        orderId: UUID_ORDER,
        shippedAt: new Date().toISOString(),
        trackingNumber: 'TRK-AAAA1111',
        courierId: 'c1',
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('SendOrderEmailCommand');
  });
});

describe('OrderDeliverySaga', () => {
  it('onOrderDelivered → NotifyCustomerCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderDeliverySaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderDelivered(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderDeliveredEvent({
      aggregateId: UUID_ORDER,
      payload: { orderId: UUID_ORDER, deliveredAt: new Date().toISOString() },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('NotifyCustomerCommand');
  });
});

describe('OrderCancelSaga', () => {
  it('onOrderCancelled → SendOrderEmailCommand (with refund)', async () => {
    const bus = makeCommandBus();
    const saga = new OrderCancelSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onOrderCancelled(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderCancelledEvent({
      aggregateId: UUID_ORDER,
      payload: {
        orderId: UUID_ORDER,
        cancelledAt: new Date().toISOString(),
        reason: 'customer_request',
        refundAmount: 100,
        currency: 'BDT',
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('SendOrderEmailCommand');
  });
});

describe('OrderReturnSaga', () => {
  it('onReturnRequested → NotifyVendorCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderReturnSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onReturnRequested(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderReturnRequestedEvent({
      aggregateId: 'rrrrrrrr-rrrr-4rrr-8rrr-rrrrrrrrrrrr',
      payload: {
        returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
        orderId: UUID_ORDER,
        customerId: UUID_CUSTOMER,
        reason: 'defective',
        itemIds: ['44444444-4444-4444-8444-444444444444'],
        images: [],
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('NotifyVendorCommand');
  });

  it('onReturnCompleted → SendOrderEmailCommand', async () => {
    const bus = makeCommandBus();
    const saga = new OrderReturnSaga(bus as unknown as CommandBus);
    const subject = new Subject<unknown>();
    const obs = saga.onReturnCompleted(subject.asObservable());
    const next = firstValueFrom(obs);
    subject.next(new OrderReturnCompletedEvent({
      aggregateId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      payload: {
        returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
        orderId: UUID_ORDER,
        completedAt: new Date().toISOString(),
        refundAmount: 100,
        restockFee: 0,
        currency: 'BDT',
      },
    }));
    const cmd = await next;
    expect(cmd.constructor.name).toBe('SendOrderEmailCommand');
  });
});

describe('ALL_SAGAS', () => {
  it('exports 7 sagas', () => {
    expect(ALL_SAGAS).toHaveLength(7);
  });
});
