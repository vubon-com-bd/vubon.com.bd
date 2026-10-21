/**
 * WebhookEventPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { WebhookEventPrismaRepository } from '@infrastructure/repos/webhook-event.prisma.repository';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'wh-1',
  paymentId: 'pay-1',
  provider: 'stripe',
  eventType: 'payment_intent.succeeded',
  externalId: 'evt_123',
  signature: 'sig_abc',
  payload: { raw: true },
  status: 'processed',
  processedAt: new Date('2025-01-15T10:00:00.000Z'),
  failureReason: null,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('WebhookEventPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: WebhookEventPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new WebhookEventPrismaRepository(prisma as never);
    delegate = prisma.__delegate('webhookEvent');
  });

  it('findById returns record', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const record = await repo.findById('wh-1');
    expect(record?.id).toBe('wh-1');
    expect(record?.provider).toBe('stripe');
  });

  it('findByExternalId filters provider + externalId', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const record = await repo.findByExternalId('stripe', 'evt_123');
    expect(record?.externalId).toBe('evt_123');
    const args = delegate.findFirst.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['provider']).toBe('stripe');
    expect(args.where['externalId']).toBe('evt_123');
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findByPayment('pay-1');
    expect(list).toHaveLength(1);
  });

  it('save creates when new', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(ROW);
    const record = {
      id: 'wh-1',
      paymentId: 'pay-1',
      provider: 'stripe',
      eventType: 'payment_intent.succeeded',
      externalId: 'evt_123',
      signature: 'sig_abc',
      payload: {},
      status: 'processed',
      processedAt: '2025-01-15T10:00:00.000Z',
      failureReason: undefined,
      createdAt: '2025-01-15T10:00:00.000Z',
      updatedAt: '2025-01-15T10:00:00.000Z',
      deletedAt: undefined,
    };
    const result = await repo.save(record);
    expect(result.id).toBe('wh-1');
    expect(delegate.create).toHaveBeenCalled();
  });

  it('findPaginated filters by provider', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    delegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { provider: 'stripe' },
    });
    expect(result.total).toBe(1);
    expect(result.items).toHaveLength(1);
  });

  it('purgeOlderThan returns count', async () => {
    delegate.findMany.mockResolvedValue([{ id: 'wh-1' }, { id: 'wh-2' }]);
    const count = await repo.purgeOlderThan(30);
    expect(count).toBe(2);
  });
});
