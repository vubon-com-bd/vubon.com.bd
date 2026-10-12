/**
 * Bulk repo tests — payout, settlement, invoice
 * @module vendor-service/test/unit/infrastructure/persistence/prisma/repositories
 */
import { jest } from '@jest/globals';
import { VendorPayoutPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-payout.prisma.repository.js';
import { VendorSettlementPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-settlement.prisma.repository.js';
import { VendorInvoicePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-invoice.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';
import { PayoutStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../../../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { InvoiceStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/invoice-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2026-02-01T00:00:00Z');

// ═══════════════ PAYOUT ═══════════════
function makePayoutRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    payoutNumber: 'PO-20260101-ABCDEF',
    status: 'pending',
    method: 'bank_transfer',
    cycle: 'on_demand',
    amount: 5000, fee: 0, netAmount: 5000, currency: 'BDT',
    periodStart: NOW, periodEnd: NOW,
    bankAccountId: UUID, transactionId: null, reference: null, notes: null,
    requestedAt: NOW, approvedAt: null, approvedBy: null,
    paidAt: null, failedAt: null, failureReason: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorPayoutPrismaRepository', () => {
  let repo: VendorPayoutPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorPayoutPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(makePayoutRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findByStatus(PayoutStatusVO.pending())).length).toBe(1);
  });

  it('findByMethod', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findByMethod(PayoutMethodVO.create('bank_transfer'))).length).toBe(1);
  });

  it('findByNumber', async () => {
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(makePayoutRow());
    expect(await repo.findByNumber('PO-20260101-ABCDEF')).not.toBeNull();
  });

  it('findPaginated', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    prisma.mock.vendorPayout.count.mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 20 });
    expect(r.total).toBe(1);
  });

  it('findPaginated with filters', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([]);
    prisma.mock.vendorPayout.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 1, limit: 20,
      filter: {
        vendorId: UUID, status: 'paid', method: 'bank_transfer',
        fromDate: '2026-01-01T00:00:00Z', toDate: '2026-02-01T00:00:00Z',
        minAmount: 100, maxAmount: 10000,
      },
    });
    expect(prisma.mock.vendorPayout.findMany).toHaveBeenCalled();
  });

  it('search', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.search({ status: 'pending' })).length).toBe(1);
  });

  it('findActive', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findActive()).length).toBe(1);
  });

  it('findProcessingPastSla', async () => {
    prisma.mock.vendorPayout.findMany.mockResolvedValue([makePayoutRow()]);
    expect((await repo.findProcessingPastSla(72)).length).toBe(1);
  });

  it('countTodayByVendor', async () => {
    prisma.mock.vendorPayout.count.mockResolvedValue(2);
    expect(await repo.countTodayByVendor(UUID)).toBe(2);
  });

  it('getSummary', async () => {
    prisma.mock.vendorPayout.aggregate
      .mockResolvedValueOnce({ _sum: { netAmount: 10000 } })
      .mockResolvedValueOnce({ _sum: { netAmount: 5000 } });
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(makePayoutRow({ status: 'paid', paidAt: NOW }));
    const r = await repo.getSummary(UUID);
    expect(r.totalPaid).toBe(10000);
    expect(r.totalPending).toBe(5000);
  });

  it('getSummary with no rows', async () => {
    prisma.mock.vendorPayout.aggregate
      .mockResolvedValueOnce({ _sum: { netAmount: null } })
      .mockResolvedValueOnce({ _sum: { netAmount: null } });
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(null);
    const r = await repo.getSummary(UUID);
    expect(r.totalPaid).toBe(0);
    expect(r.currency).toBe('BDT');
  });

  it('sumPaidBetween', async () => {
    prisma.mock.vendorPayout.aggregate.mockResolvedValue({ _sum: { netAmount: 5000 } });
    expect(await repo.sumPaidBetween(UUID, '2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).toBe(5000);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorPayout.count.mockResolvedValue(3);
    expect(await repo.countByStatus(PayoutStatusVO.pending())).toBe(3);
  });

  it('save creates', async () => {
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(null);
    prisma.mock.vendorPayout.create.mockResolvedValue(makePayoutRow());
    const { VendorPayoutEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-payout.entity.js'
    );
    const { PayoutAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js'
    );
    const { PayoutCycleVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js'
    );
    const entity = VendorPayoutEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        payoutNumber: 'PO-TEST-000001',
        method: PayoutMethodVO.reconstitute('bank_transfer'),
        cycle: PayoutCycleVO.reconstitute('on_demand'),
        amount: PayoutAmountVO.create(5000, 'BDT'),
        netAmount: PayoutAmountVO.create(5000, 'BDT'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-01-01T00:00:00.000Z',
        bankAccountId: UUID,
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorPayout.findFirst.mockResolvedValue(makePayoutRow());
    prisma.mock.vendorPayout.update.mockResolvedValue(makePayoutRow());
    const { VendorPayoutEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-payout.entity.js'
    );
    const { PayoutAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js'
    );
    const { PayoutCycleVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js'
    );
    const entity = VendorPayoutEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        payoutNumber: 'PO-TEST-000001',
        status: PayoutStatusVO.pending(),
        method: PayoutMethodVO.reconstitute('bank_transfer'),
        cycle: PayoutCycleVO.reconstitute('on_demand'),
        amount: PayoutAmountVO.create(5000, 'BDT'),
        netAmount: PayoutAmountVO.create(5000, 'BDT'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-01-01T00:00:00.000Z',
        bankAccountId: UUID,
        requestedAt: '2026-01-01T00:00:00.000Z',
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorPayout.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorPayout.delete.mockResolvedValue(makePayoutRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorPayout.delete).toHaveBeenCalled();
  });

  it('exists', async () => {
    prisma.mock.vendorPayout.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});

// ═══════════════ SETTLEMENT ═══════════════
function makeSettlementRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    settlementNumber: 'ST-20260101-ABCDEF',
    status: 'pending',
    grossAmount: 10000, commissionAmount: 1000, netAmount: 9000, currency: 'BDT',
    periodStart: NOW, periodEnd: FUTURE,
    orderCount: 5, payoutId: null, processedAt: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorSettlementPrismaRepository', () => {
  let repo: VendorSettlementPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorSettlementPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(makeSettlementRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findByStatus('pending')).length).toBe(1);
  });

  it('findByNumber', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(makeSettlementRow());
    expect(await repo.findByNumber('ST-20260101-ABCDEF')).not.toBeNull();
  });

  it('findByPayoutId', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findByPayoutId(UUID)).length).toBe(1);
  });

  it('search', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.search({ status: 'pending' })).length).toBe(1);
  });

  it('findPendingReady', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findPendingReady()).length).toBe(1);
  });

  it('findProcessingPastSla', async () => {
    prisma.mock.vendorSettlement.findMany.mockResolvedValue([makeSettlementRow()]);
    expect((await repo.findProcessingPastSla(48)).length).toBe(1);
  });

  it('findLatestByVendorId', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(makeSettlementRow());
    expect(await repo.findLatestByVendorId(UUID)).not.toBeNull();
  });

  it('sumNetBetween', async () => {
    prisma.mock.vendorSettlement.aggregate.mockResolvedValue({ _sum: { netAmount: 9000 } });
    expect(await repo.sumNetBetween(UUID, '2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).toBe(9000);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorSettlement.count.mockResolvedValue(3);
    expect(await repo.countByStatus('pending')).toBe(3);
  });

  it('save creates', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(null);
    prisma.mock.vendorSettlement.create.mockResolvedValue(makeSettlementRow());
    const { VendorSettlementEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-settlement.entity.js'
    );
    const { SettlementAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/settlement-amount.vo.js'
    );
    const { CommissionAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js'
    );
    const entity = VendorSettlementEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        settlementNumber: 'ST-TEST-000001',
        grossAmount: SettlementAmountVO.create(10000, 'BDT'),
        commissionAmount: CommissionAmountVO.create(1000, 'BDT'),
        netAmount: SettlementAmountVO.create(9000, 'BDT'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-02-01T00:00:00.000Z',
        orderCount: 5,
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorSettlement.findFirst.mockResolvedValue(makeSettlementRow());
    prisma.mock.vendorSettlement.update.mockResolvedValue(makeSettlementRow());
    const { VendorSettlementEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-settlement.entity.js'
    );
    const { SettlementAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/settlement-amount.vo.js'
    );
    const { CommissionAmountVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js'
    );
    const entity = VendorSettlementEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        settlementNumber: 'ST-TEST-000001',
        status: 'pending',
        grossAmount: SettlementAmountVO.create(10000, 'BDT'),
        commissionAmount: CommissionAmountVO.create(1000, 'BDT'),
        netAmount: SettlementAmountVO.create(9000, 'BDT'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-02-01T00:00:00.000Z',
        orderCount: 5,
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorSettlement.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorSettlement.delete.mockResolvedValue(makeSettlementRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorSettlement.delete).toHaveBeenCalled();
  });

  it('exists', async () => {
    prisma.mock.vendorSettlement.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});

// ═══════════════ INVOICE ═══════════════
function makeInvoiceRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    invoiceNumber: 'INV-202601-0000000001',
    type: 'commission', status: 'draft',
    amount: 1000, taxAmount: 0, totalAmount: 1000, currency: 'BDT',
    issueDate: NOW, dueDate: FUTURE, paidAt: null,
    periodStart: null, periodEnd: null, orderIds: [],
    notes: null, pdfUrl: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorInvoicePrismaRepository', () => {
  let repo: VendorInvoicePrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorInvoicePrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorInvoice.findFirst.mockResolvedValue(makeInvoiceRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorInvoice.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });

  it('findByStatus', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findByStatus(InvoiceStatusVO.draft())).length).toBe(1);
  });

  it('findByType', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findByType(InvoiceTypeVO.create('commission'))).length).toBe(1);
  });

  it('findByNumber', async () => {
    prisma.mock.vendorInvoice.findFirst.mockResolvedValue(makeInvoiceRow());
    expect(await repo.findByNumber('INV-202601-0000000001')).not.toBeNull();
  });

  it('findByOrderId', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow({ orderIds: [UUID] })]);
    expect((await repo.findByOrderId(UUID)).length).toBe(1);
  });

  it('search', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.search({ type: 'commission', status: 'draft' })).length).toBe(1);
  });

  it('findOverdue', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findOverdue()).length).toBe(1);
  });

  it('findDueWithin', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findDueWithin(30)).length).toBe(1);
  });

  it('findUnpaidByVendorId', async () => {
    prisma.mock.vendorInvoice.findMany.mockResolvedValue([makeInvoiceRow()]);
    expect((await repo.findUnpaidByVendorId(UUID)).length).toBe(1);
  });

  it('sumUnpaidByVendorId', async () => {
    prisma.mock.vendorInvoice.aggregate.mockResolvedValue({ _sum: { totalAmount: 1000 } });
    expect(await repo.sumUnpaidByVendorId(UUID)).toBe(1000);
  });

  it('countByStatus', async () => {
    prisma.mock.vendorInvoice.count.mockResolvedValue(3);
    expect(await repo.countByStatus(InvoiceStatusVO.draft())).toBe(3);
  });

  it('existsByNumber', async () => {
    prisma.mock.vendorInvoice.count.mockResolvedValue(1);
    expect(await repo.existsByNumber('INV-202601-0000000001')).toBe(true);
  });

  it('save creates', async () => {
    prisma.mock.vendorInvoice.findFirst.mockResolvedValue(null);
    prisma.mock.vendorInvoice.create.mockResolvedValue(makeInvoiceRow());
    const { VendorInvoiceEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-invoice.entity.js'
    );
    const { InvoiceNumberVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/invoice-number.vo.js'
    );
    const entity = VendorInvoiceEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        invoiceNumber: InvoiceNumberVO.reconstitute('INV-202601-0000000001'),
        type: InvoiceTypeVO.create('commission'),
        amount: 1000, totalAmount: 1000, currency: 'BDT',
        issueDate: '2026-01-01T00:00:00.000Z',
        dueDate: '2026-02-01T00:00:00.000Z',
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('save updates', async () => {
    prisma.mock.vendorInvoice.findFirst.mockResolvedValue(makeInvoiceRow());
    prisma.mock.vendorInvoice.update.mockResolvedValue(makeInvoiceRow());
    const { VendorInvoiceEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-invoice.entity.js'
    );
    const { InvoiceNumberVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/invoice-number.vo.js'
    );
    const entity = VendorInvoiceEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        invoiceNumber: InvoiceNumberVO.reconstitute('INV-202601-0000000001'),
        type: InvoiceTypeVO.create('commission'),
        status: InvoiceStatusVO.draft(),
        amount: 1000, taxAmount: 0, totalAmount: 1000, currency: 'BDT',
        issueDate: '2026-01-01T00:00:00.000Z',
        dueDate: '2026-02-01T00:00:00.000Z',
        orderIds: [],
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorInvoice.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorInvoice.delete.mockResolvedValue(makeInvoiceRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorInvoice.delete).toHaveBeenCalled();
  });

  it('exists', async () => {
    prisma.mock.vendorInvoice.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});
