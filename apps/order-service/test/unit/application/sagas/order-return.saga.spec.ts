/**
 * OrderReturnSaga — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom } from 'rxjs';
import { OrderReturnSaga } from '@application/sagas/order-return.saga.js';
import { OrderReturnRequestedEvent } from '@domain/events/order-return.events.js';
import { NotifyCustomerCommand } from '@application/sagas/commands/notify-customer.command.js';
import { FIXTURE_ID, FIXTURE_ID_2, FIXTURE_NOW } from '@fixtures/application/entity-factories.js';

describe('OrderReturnSaga', () => {
  let saga: OrderReturnSaga;

  beforeEach(() => {
    saga = new OrderReturnSaga();
  });

  it('emits NotifyCustomerCommand on return requested', async () => {
    const event = new OrderReturnRequestedEvent({
      aggregateId: FIXTURE_ID,
      payload: {
        returnId: FIXTURE_ID,
        orderId: FIXTURE_ID_2,
        customerId: FIXTURE_ID,
        reason: 'defective',
        itemIds: [FIXTURE_ID],
        requestedAt: FIXTURE_NOW,
      },
      occurredAt: FIXTURE_NOW as never,
    });

    const result$ = saga.onReturnRequested(of(event));
    const cmd = (await firstValueFrom(result$)) as unknown as NotifyCustomerCommand;

    expect(cmd).toBeInstanceOf(NotifyCustomerCommand);
    expect(cmd.template).toBe('return_requested');
    expect(cmd.orderId).toBe(FIXTURE_ID_2);
  });
});
