/**
 * RefundProcessingSaga — Unit Tests
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
import { RefundProcessingSaga } from '@application/sagas/refund-processing.saga';
import {
  RefundRequestedEvent,
  RefundCompletedEvent,
  RefundFailedEvent,
} from '@domain/events/refund.events';

function makeMockCommandBus() {
  return { execute: jest.fn().mockResolvedValue(undefined) };
}

type SagaStream = { subscribe: (fn: (cmd: unknown) => void) => { unsubscribe: () => void } };

describe('RefundProcessingSaga', () => {
  let saga: RefundProcessingSaga;
  let bus: ReturnType<typeof makeMockCommandBus>;

  beforeEach(() => {
    bus = makeMockCommandBus();
    saga = new RefundProcessingSaga(bus as never);
  });

  it('onRequested should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onRequested: (o: unknown) => unknown }).onRequested;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new RefundRequestedEvent({
        aggregateId: 'r-1',
        payload: {
          refundId: 'r-1',
          paymentId: 'p-1',
          amount: 100,
          currency: 'BDT',
          reason: 'customer_request',
          requestedAt: '2025-01-15T10:00:00.000Z',
        },
      }),
    );
  });

  it('onCompleted should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onCompleted: (o: unknown) => unknown }).onCompleted;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new RefundCompletedEvent({
        aggregateId: 'r-1',
        payload: {
          refundId: 'r-1',
          paymentId: 'p-1',
          refundedAmount: 100,
          currency: 'BDT',
          completedAt: '2025-01-15T10:00:00.000Z',
        },
      }),
    );
  });

  it('onFailed should emit a command', (done) => {
    const subject = new Subject<unknown>();
    const method = (saga as unknown as { onFailed: (o: unknown) => unknown }).onFailed;
    const stream = method.call(saga, subject.asObservable()) as SagaStream;

    stream.subscribe(() => done());

    subject.next(
      new RefundFailedEvent({
        aggregateId: 'r-1',
        payload: {
          refundId: 'r-1',
          paymentId: 'p-1',
          fromStatus: 'processing',
          toStatus: 'failed',
          reason: 'gateway error',
        },
      }),
    );
  });
});
