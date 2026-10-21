/**
 * InvoiceGeneratorWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { InvoiceGeneratorWorker } from '@infrastructure/workers/invoice-generator.worker';
import { InvoicePrismaMapper } from '@infrastructure/mappers/invoice.prisma.mapper';
import { makeMockQueueService } from '@test-infra/queue-mock';

const INV_ID = '99999999-9999-4999-8999-999999999999';

const INV_ROW = {
  id: INV_ID,
  invoiceNumber: 'INV-2025-000001',
  userId: '33333333-3333-4333-8333-333333333333',
  orderId: null,
  status: 'draft',
  subtotal: 1000,
  taxAmount: 150,
  total: 1150,
  currency: 'BDT',
  issuedAt: null,
  dueAt: null,
  paidAt: null,
  voidedAt: null,
  refundedAt: null,
  notes: null,
  createdAt: new Date('2025-01-15T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

function makeInvRepoMock() {
  return {
    findByIdVO: jest.fn(),
    save: jest.fn(),
  };
}

describe('InvoiceGeneratorWorker', () => {
  let worker: InvoiceGeneratorWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeInvRepoMock>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeInvRepoMock();
    worker = new InvoiceGeneratorWorker(queue as never, repo as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('skips when invoice not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { invoiceId: string }) => Promise<unknown>;
    }).handle({ invoiceId: INV_ID });
    expect(result).toEqual({ skipped: true });
  });

  it('skips when not draft', async () => {
    const inv = InvoicePrismaMapper.toDomain({
      ...INV_ROW,
      status: 'issued',
      issuedAt: new Date(),
    });
    repo.findByIdVO.mockResolvedValue(inv);
    const result = await (worker as unknown as {
      handle: (p: { invoiceId: string }) => Promise<unknown>;
    }).handle({ invoiceId: INV_ID });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true }),
    );
  });

  it('issues a draft invoice', async () => {
    const inv = InvoicePrismaMapper.toDomain(INV_ROW);
    repo.findByIdVO.mockResolvedValue(inv);
    repo.save.mockResolvedValue(inv);

    const result = await (worker as unknown as {
      handle: (p: { invoiceId: string }) => Promise<unknown>;
    }).handle({ invoiceId: INV_ID });

    expect(result).toEqual({ issued: true });
    expect(inv.status.isIssued()).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
