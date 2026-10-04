import { RefundControllerMapper } from '../../../../src/module/interfaces/mappers/refund.controller.mapper.js';
import { TransactionControllerMapper } from '../../../../src/module/interfaces/mappers/transaction.controller.mapper.js';
import { WebhookControllerMapper } from '../../../../src/module/interfaces/mappers/webhook.controller.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('RefundControllerMapper — toHttpResponse', () => {
  it('passes through', () => {
    const out = RefundControllerMapper.toHttpResponse({
      id: UUID,
      paymentId: UUID,
      status: 'pending',
      amount: 500,
      currency: 'BDT',
      createdAt: 'now',
      updatedAt: 'now',
    });
    expect(out.id).toBe(UUID);
    expect(out.amount).toBe(500);
  });
});

describe('TransactionControllerMapper — toHttpResponse', () => {
  it('passes through', () => {
    const out = TransactionControllerMapper.toHttpResponse({
      id: UUID,
      paymentId: UUID,
      type: 'payment',
      status: 'success',
      amount: 1000,
      currency: 'BDT',
      createdAt: 'now',
      updatedAt: 'now',
    });
    expect(out.id).toBe(UUID);
    expect(out.type).toBe('payment');
  });
});

describe('WebhookControllerMapper — toHttpResponse', () => {
  it('passes through', () => {
    const out = WebhookControllerMapper.toHttpResponse({
      id: UUID,
      gateway: 'bkash',
      gatewayEventId: 'evt_1',
      eventType: 'x',
      verified: true,
      processed: false,
      attempts: 0,
      receivedAt: 'now',
    });
    expect(out.id).toBe(UUID);
    expect(out.gateway).toBe('bkash');
  });
});
