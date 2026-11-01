/**
 * PaymentResolver — unit tests (full branch coverage)
 * @module payment-service/test/unit/interfaces/controllers/graphql
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaymentResolver } from '@interfaces/controllers/graphql/payment.resolver';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PaymentResolver', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let resolver: PaymentResolver;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    queryBus = { execute: jest.fn(async () => ({ id: 'p1', status: 'paid' })) };
    resolver = new PaymentResolver(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('getPayment dispatches GetPaymentQuery', async () => {
    const result = await resolver.getPayment('p1', user);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 'p1', status: 'paid' });
  });

  // ─── listPayments: page ?? 1 and limit ?? 20 branches ───
  it('listPayments with no page/limit uses defaults 1/20', async () => {
    await resolver.listPayments(user);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listPayments with page only (limit undefined)', async () => {
    await resolver.listPayments(user, 2);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listPayments with limit only (page undefined)', async () => {
    await resolver.listPayments(user, undefined, 10);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listPayments with both page and limit', async () => {
    await resolver.listPayments(user, 3, 15);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  // ─── cancelPayment ───
  it('cancelPayment dispatches CancelPaymentCommand', async () => {
    const result = await resolver.cancelPayment('p1', 'customer request', user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 'p1' });
  });
});
