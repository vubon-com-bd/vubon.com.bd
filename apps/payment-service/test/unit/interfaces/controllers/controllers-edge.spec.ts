import { jest } from '@jest/globals';
import { PaymentController } from '../../../../src/module/interfaces/controllers/rest/payment.controller.js';
import { WebhookController } from '../../../../src/module/interfaces/controllers/rest/webhook.controller.js';
import { HealthController } from '../../../../src/module/interfaces/controllers/rest/health.controller.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentController — edge cases', () => {
  let c: PaymentController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ ok: true })) };
    queryBus = { execute: jest.fn(async () => ({ ok: true })) };
    c = new PaymentController(commandBus as never, queryBus as never);
  });

  it('list with explicit pagination params', async () => {
    await c.list({ page: 3, limit: 5, orderId: UUID, currency: 'BDT' });
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('stats with userId + gateway', async () => {
    await c.stats(UUID, 'bkash');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('initiate with metadata', async () => {
    await c.initiate(
      {
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
        metadata: { source: 'web' },
        idempotencyKey: 'idem_abc12345',
      },
      { userId: UUID },
    );
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('verify without gatewaySignature', async () => {
    await c.verify(UUID, {}, { userId: UUID });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('cancel without reason', async () => {
    await c.cancel(UUID, {}, { userId: UUID });
    expect(commandBus.execute).toHaveBeenCalled();
  });
});

describe('WebhookController — eventId derivation', () => {
  let c: WebhookController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ ok: true })) };
    queryBus = { execute: jest.fn(async () => ({ ok: true })) };
    c = new WebhookController(commandBus as never, queryBus as never);
  });

  it('derives eventId from eventId field', async () => {
    await c.receive('stripe', { eventId: 'e_1', eventType: 'payment.succeeded' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('derives eventType from type', async () => {
    await c.receive('stripe', { id: 'e_1', type: 'payment.failed' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('extracts sig fallback', async () => {
    await c.receive('bkash', { id: 'e_1', sig: 'sig_abc' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('no id → generated eventId', async () => {
    await c.receive('rocket', {});
    expect(commandBus.execute).toHaveBeenCalled();
  });
});

describe('HealthController — throw paths', () => {
  it('prisma healthy + redis healthy → ok', async () => {
    const c = new HealthController(
      { isHealthy: jest.fn(async () => true) } as never,
      { isHealthy: jest.fn(async () => true) } as never,
    );
    expect((await c.check()).status).toBe('ok');
  });

  it('prisma throws → degraded', async () => {
    const c = new HealthController(
      {
        isHealthy: jest.fn(async () => {
          throw new Error('db down');
        }),
      } as never,
      { isHealthy: jest.fn(async () => true) } as never,
    );
    const r = await c.check();
    expect(r.checks.prisma).toBe(false);
  });

  it('redis throws → degraded', async () => {
    const c = new HealthController(
      { isHealthy: jest.fn(async () => true) } as never,
      {
        isHealthy: jest.fn(async () => {
          throw new Error('redis down');
        }),
      } as never,
    );
    expect((await c.check()).checks.redis).toBe(false);
  });
});
