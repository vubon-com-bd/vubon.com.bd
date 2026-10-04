import { jest } from '@jest/globals';
import { RefundControllerMapper } from '../../../../src/module/interfaces/mappers/refund.controller.mapper.js';
import { TransactionControllerMapper } from '../../../../src/module/interfaces/mappers/transaction.controller.mapper.js';
import { WebhookControllerMapper } from '../../../../src/module/interfaces/mappers/webhook.controller.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('RefundControllerMapper', () => {
  it('toRequestAppDto maps fields', () => {
    const out = RefundControllerMapper.toRequestAppDto({
      paymentId: UUID,
      amount: 500,
      reason: 'damaged',
      idempotencyKey: 'idem_abc12345',
    });
    expect(out.paymentId).toBe(UUID);
    expect(out.amount).toBe(500);
  });
});

describe('TransactionControllerMapper', () => {
  it('toListAppDto applies defaults', () => {
    const out = TransactionControllerMapper.toListAppDto({});
    expect(out.page).toBe(1);
    expect(out.limit).toBe(20);
  });

  it('toListAppDto keeps provided values', () => {
    const out = TransactionControllerMapper.toListAppDto({
      page: 5,
      limit: 50,
      paymentId: UUID,
    });
    expect(out.page).toBe(5);
    expect(out.limit).toBe(50);
    expect(out.paymentId).toBe(UUID);
  });
});

describe('WebhookControllerMapper', () => {
  it('toListAppDto applies defaults', () => {
    const out = WebhookControllerMapper.toListAppDto({});
    expect(out.page).toBe(1);
    expect(out.limit).toBe(20);
  });

  it('toListAppDto passes filter fields', () => {
    const out = WebhookControllerMapper.toListAppDto({
      page: 1,
      limit: 10,
      gateway: 'bkash',
      processed: false,
    });
    expect(out.gateway).toBe('bkash');
    expect(out.processed).toBe(false);
  });
});
