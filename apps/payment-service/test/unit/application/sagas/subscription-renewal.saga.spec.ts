/**
 * SubscriptionRenewalSaga — Unit Tests
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
import { SubscriptionRenewalSaga } from '@application/sagas/subscription-renewal.saga';
import {
  SubscriptionCreatedEvent,
  SubscriptionRenewedEvent,
  SubscriptionCancelledEvent,
} from '@domain/events/subscription.events';

function makeMockCommandBus() {
  return { execute: jest.fn().mockResolvedValue(undefined) };
}

type SagaStream = { subscribe: (fn: (cmd: unknown) => void) => { unsubscribe: () => void } };

describe('SubscriptionRenewalSaga', () => {
  let saga: SubscriptionRenewalSaga;
  let bus: ReturnType<typeof makeMockCommandBus>;

  beforeEach(() => {
    bus = makeMockCommandBus();
    saga = new SubscriptionRenewalSaga(bus as never);
  });

  it('onCreated should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onCreated: (o: unknown) => unknown }).onCreated;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new SubscriptionCreatedEvent({
        aggregateId: 's-1',
        payload: {
          subscriptionId: 's-1',
          userId: 'u-1',
          plan: 'premium',
          price: 500,
          currency: 'BDT',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
      }),
    );
  });

  it('onRenewed should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onRenewed: (o: unknown) => unknown }).onRenewed;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new SubscriptionRenewedEvent({
        aggregateId: 's-1',
        payload: {
          subscriptionId: 's-1',
          periodStart: '2025-02-01T00:00:00.000Z',
          periodEnd: '2025-03-01T00:00:00.000Z',
          renewedAt: '2025-02-01T00:00:00.000Z',
        },
      }),
    );
  });

  it('onCancelledOrExpired should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as {
      onCancelledOrExpired: (o: unknown) => unknown;
    }).onCancelledOrExpired;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new SubscriptionCancelledEvent({
        aggregateId: 's-1',
        payload: {
          subscriptionId: 's-1',
          fromStatus: 'active',
          toStatus: 'cancelled',
        },
      }),
    );
  });
});
