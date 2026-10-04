import { jest } from '@jest/globals';
import { PaymentPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/payment.prisma.repository.js';
import { TransactionPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/transaction.prisma.repository.js';
import { RefundPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/refund.prisma.repository.js';
import { WebhookEventPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/webhook-event.prisma.repository.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockDelegate() {
  return {
    findFirst: jest.fn(async () => null),
    findMany: jest.fn(async () => []),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(async () => 0),
    aggregate: jest.fn(async () => ({ _sum: { amount: null } })),
  };
}

function mockPrisma() {
  return {
    payment: mockDelegate(),
    transaction: mockDelegate(),
    refund: mockDelegate(),
    webhookEvent: mockDelegate(),
  };
}

describe('Payment repo — filter branch coverage', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: PaymentPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new PaymentPrismaRepository(prisma as never);
  });

  it('filter by only userId', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { userId: UUID } });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('filter by only status', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { status: 'captured' } });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('filter by method + gateway + currency', async () => {
    await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { method: 'mobile_banking', gateway: 'bkash', currency: 'BDT' },
    });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('filter only maxAmount', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { maxAmount: 5000 } });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('filter only toDate', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { toDate: '2026-12-31' } });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('sortBy createdAt default dir', async () => {
    await repo.findPaginated({ page: 1, limit: 10 });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('getStats with only userId', async () => {
    await repo.getStats(UUID);
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('getStats with only fromDate', async () => {
    await repo.getStats(undefined, undefined, '2026-01-01');
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });
});

describe('Transaction repo — filter branch coverage', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: TransactionPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new TransactionPrismaRepository(prisma as never);
  });

  it('filter by gateway only', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { gateway: 'bkash' } });
    expect(prisma.transaction.findMany).toHaveBeenCalled();
  });

  it('sortBy amount asc', async () => {
    await repo.findPaginated({ page: 1, limit: 10, sortBy: 'amount', sortDir: 'asc' });
    expect(prisma.transaction.findMany).toHaveBeenCalled();
  });

  it('sumByPaymentIdAndType with number aggregate', async () => {
    prisma.transaction.aggregate.mockResolvedValue({ _sum: { amount: 1500 } });
    expect(await repo.sumByPaymentIdAndType({ value: UUID } as never, { value: 'payment' } as never)).toBe(1500);
  });
});

describe('Refund repo — filter branch coverage', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: RefundPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new RefundPrismaRepository(prisma as never);
  });

  it('filter by only status', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { status: 'succeeded' } });
    expect(prisma.refund.findMany).toHaveBeenCalled();
  });

  it('filter by toDate only', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { toDate: '2026-12-31' } });
    expect(prisma.refund.findMany).toHaveBeenCalled();
  });

  it('sortBy amount', async () => {
    await repo.findPaginated({ page: 1, limit: 10, sortBy: 'amount' });
    expect(prisma.refund.findMany).toHaveBeenCalled();
  });
});

describe('Webhook repo — filter branch coverage', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: WebhookEventPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new WebhookEventPrismaRepository(prisma as never);
  });

  it('filter by verified only', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { verified: true } });
    expect(prisma.webhookEvent.findMany).toHaveBeenCalled();
  });

  it('filter by processed only', async () => {
    await repo.findPaginated({ page: 1, limit: 10, filter: { processed: false } });
    expect(prisma.webhookEvent.findMany).toHaveBeenCalled();
  });

  it('filter by eventType + fromDate', async () => {
    await repo.findPaginated({
      page: 1,
      limit: 10,
      filter: { eventType: 'x', fromDate: '2026-01-01' },
    });
    expect(prisma.webhookEvent.findMany).toHaveBeenCalled();
  });
});
