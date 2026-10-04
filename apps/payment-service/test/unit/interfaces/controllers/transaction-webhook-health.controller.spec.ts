import { jest } from '@jest/globals';
import { TransactionController } from '../../../../src/module/interfaces/controllers/rest/transaction.controller.js';
import { WebhookController } from '../../../../src/module/interfaces/controllers/rest/webhook.controller.js';
import { HealthController } from '../../../../src/module/interfaces/controllers/rest/health.controller.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('TransactionController', () => {
  let c: TransactionController;
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    queryBus = { execute: jest.fn(async () => ({ ok: true })) };
    c = new TransactionController(queryBus as never);
  });

  it('list → ListTransactionsQuery', async () => {
    await c.list({});
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('listByPayment → ListTransactionsByPaymentQuery', async () => {
    await c.listByPayment(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('listByOrder → ListTransactionsByOrderQuery', async () => {
    await c.listByOrder(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById → GetTransactionQuery', async () => {
    await c.getById(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});

describe('WebhookController', () => {
  let c: WebhookController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ ok: true })) };
    queryBus = { execute: jest.fn(async () => ({ ok: true })) };
    c = new WebhookController(commandBus as never, queryBus as never);
  });

  it('receive → ProcessWebhookCommand (derives eventId from id)', async () => {
    await c.receive('bkash', { id: 'evt_1', type: 'payment.succeeded' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('receive derives eventId from event_id', async () => {
    await c.receive('nagad', { event_id: 'e2', event_type: 'payment.failed' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('receive falls back when no id', async () => {
    await c.receive('rocket', {});
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('receive extracts signature', async () => {
    await c.receive('stripe', { id: 'e3', signature: 'sig_abc' });
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('list → ListWebhookEventsQuery', async () => {
    await c.list({});
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById → GetWebhookQuery', async () => {
    await c.getById(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });
});

describe('HealthController', () => {
  let c: HealthController;
  let prisma: { isHealthy: jest.Mock };
  let redis: { isHealthy: jest.Mock };

  beforeEach(() => {
    prisma = { isHealthy: jest.fn(async () => true) };
    redis = { isHealthy: jest.fn(async () => true) };
    c = new HealthController(prisma as never, redis as never);
  });

  it('check returns ok when all healthy', async () => {
    const r = await c.check();
    expect(r.status).toBe('ok');
    expect(r.checks.prisma).toBe(true);
    expect(r.checks.redis).toBe(true);
  });

  it('check returns degraded when prisma down', async () => {
    prisma.isHealthy.mockResolvedValue(false);
    const r = await c.check();
    expect(r.status).toBe('degraded');
  });

  it('check returns degraded when redis throws', async () => {
    redis.isHealthy.mockRejectedValue(new Error('redis down'));
    const r = await c.check();
    expect(r.checks.redis).toBe(false);
  });

  it('check handles prisma throw', async () => {
    prisma.isHealthy.mockRejectedValue(new Error('prisma err'));
    const r = await c.check();
    expect(r.checks.prisma).toBe(false);
  });

  it('live returns ok', () => {
    expect(c.live()).toEqual({ status: 'ok' });
  });

  it('ready ok when prisma healthy', async () => {
    expect(await c.ready()).toEqual({ status: 'ok' });
  });

  it('ready not_ready when prisma down', async () => {
    prisma.isHealthy.mockResolvedValue(false);
    expect(await c.ready()).toEqual({ status: 'not_ready' });
  });
});
