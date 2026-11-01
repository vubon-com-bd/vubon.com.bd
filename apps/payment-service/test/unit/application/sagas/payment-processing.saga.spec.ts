/**
 * PaymentProcessingSaga — Unit Tests
 *
 * NOTE: Sagas define methods as class fields with @Saga() decorator.
 * We mock the decorator as no-op and access methods directly on the instance.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  Saga: () => () => undefined,
  ofType: (...types: unknown[]) => {
    const { filter } = jest.requireActual('rxjs/operators') as {
      filter: (fn: (v: unknown) => boolean) => (s: unknown) => unknown;
    };
    return filter((event: unknown) => {
      const name = (event as { constructor: { name: string } })?.constructor?.name;
      return types.some((T) => (T as { name: string })?.name === name);
    });
  },
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { Subject } from 'rxjs';
import { PaymentProcessingSaga } from '@application/sagas/payment-processing.saga';
import {
  PaymentCreatedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
} from '@domain/events/payment.events';

function makeMockCommandBus() {
  return { execute: jest.fn().mockResolvedValue(undefined) };
}

type SagaStream = { subscribe: (fn: (cmd: unknown) => void) => { unsubscribe: () => void } };

describe('PaymentProcessingSaga', () => {
  let saga: PaymentProcessingSaga;
  let bus: ReturnType<typeof makeMockCommandBus>;

  beforeEach(() => {
    bus = makeMockCommandBus();
    saga = new PaymentProcessingSaga(bus as never);
  });

  it('onCreated should emit a command for PaymentCreatedEvent', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onCreated: (o: unknown) => unknown }).onCreated;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe((cmd) => {
      expect(cmd).toBeDefined();
      done();
    });

    subject.next(
      new PaymentCreatedEvent({
        aggregateId: 'p-1',
        payload: {
          paymentId: 'p-1',
          orderId: 'o-1',
          userId: 'u-1',
          amount: 1000,
          currency: 'BDT',
          method: 'card',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
      }),
    );
  });

  it('onPaid should emit a command for PaymentPaidEvent', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onPaid: (o: unknown) => unknown }).onPaid;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe((cmd) => {
      expect(cmd).toBeDefined();
      done();
    });

    subject.next(
      new PaymentPaidEvent({
        aggregateId: 'p-1',
        payload: { paymentId: 'p-1', fromStatus: 'captured', toStatus: 'paid' },
      }),
    );
  });

  it('onFailed should emit a command for PaymentFailedEvent', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onFailed: (o: unknown) => unknown }).onFailed;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe((cmd) => {
      expect(cmd).toBeDefined();
      done();
    });

    subject.next(
      new PaymentFailedEvent({
        aggregateId: 'p-1',
        payload: {
          paymentId: 'p-1',
          reason: 'gateway timeout',
          failedAt: '2025-01-15T10:00:00.000Z',
        },
      }),
    );
  });
});
