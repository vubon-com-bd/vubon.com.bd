/**
 * VendorInvoiceEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorInvoiceEntity } from '../../../../src/module/domain/entities/vendor-invoice.entity.js';
import { InvoiceNumberVO } from '../../../../src/module/domain/value-objects/primitives/invoice-number.vo.js';
import { InvoiceTypeVO } from '../../../../src/module/domain/value-objects/primitives/invoice-type.vo.js';
import { InvoiceStatusVO } from '../../../../src/module/domain/value-objects/primitives/invoice-status.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';
const PAST_DUE = '2020-01-01T00:00:00.000Z';
const VERY_PAST_ISSUE = '2019-01-01T00:00:00.000Z';
const NEAR_PAST_DUE = '2024-01-01T00:00:00.000Z';
const FUTURE_DUE = '2030-01-01T00:00:00.000Z';
const INV_NUM = 'INV-202501-0000000001';

function makeInvoice(overrides: { type?: string; amount?: number; totalAmount?: number } = {}) {
  return VendorInvoiceEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      invoiceNumber: InvoiceNumberVO.reconstitute(INV_NUM),
      type: InvoiceTypeVO.create((overrides.type ?? 'commission') as never),
      amount: overrides.amount ?? 500,
      taxAmount: 0,
      totalAmount: overrides.totalAmount ?? 500,
      currency: 'BDT',
      issueDate: NOW,
      dueDate: FUTURE_DUE,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  return VendorInvoiceEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      invoiceNumber: InvoiceNumberVO.reconstitute(INV_NUM),
      type: InvoiceTypeVO.create('commission'),
      status: InvoiceStatusVO.draft(),
      amount: 500,
      taxAmount: 0,
      totalAmount: 500,
      currency: 'BDT',
      issueDate: NOW,
      dueDate: FUTURE_DUE,
      ...overrides,
    } as never,
  });
}

describe('VendorInvoiceEntity — creation', () => {
  it('creates draft invoice', () => {
    const inv = makeInvoice();
    expect(inv.status.isDraft()).toBe(true);
    expect(inv.amount).toBe(500);
    expect(inv.totalAmount).toBe(500);
    expect(inv.currency).toBe('BDT');
  });

  it('creates order type invoice', () => {
    const inv = makeInvoice({ type: 'order' });
    expect(inv.type.isOrderRelated()).toBe(true);
  });

  it('creates payout type invoice', () => {
    const inv = makeInvoice({ type: 'payout' });
    expect(inv.type.isPayoutRelated()).toBe(true);
  });
});

describe('VendorInvoiceEntity — invariants', () => {
  it('rejects negative amount', () => {
    expect(() => reconstitute({ amount: -1 })).toThrow();
  });

  it('rejects totalAmount < amount', () => {
    expect(() => reconstitute({ amount: 1000, totalAmount: 500 })).toThrow();
  });

  it('rejects invalid currency', () => {
    expect(() => reconstitute({ currency: 'AB' })).toThrow();
  });

  it('rejects dueDate before issueDate', () => {
    expect(() =>
      reconstitute({ issueDate: FUTURE_DUE, dueDate: NOW }),
    ).toThrow();
  });

  it('rejects > 1000 orderIds', () => {
    expect(() => reconstitute({ orderIds: new Array(1001).fill('o') })).toThrow();
  });
});

describe('VendorInvoiceEntity — getters', () => {
  it('returns scalar getters', () => {
    const inv = makeInvoice();
    expect(inv.vendorId).toBe(VENDOR);
    expect(inv.invoiceNumber.value).toBe(INV_NUM);
    expect(inv.type.isPayable()).toBe(true);
    expect(inv.status.isDraft()).toBe(true);
    expect(inv.amount).toBe(500);
    expect(inv.totalAmount).toBe(500);
    expect(inv.currency).toBe('BDT');
    expect(inv.issueDate).toBe(NOW);
    expect(inv.dueDate).toBe(FUTURE_DUE);
    expect(inv.paidAt).toBeUndefined();
  });
});

describe('VendorInvoiceEntity — overdue', () => {
  it('isOverdue false for final status', () => {
    const inv = reconstitute({
      status: InvoiceStatusVO.paid(),
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    expect(inv.isOverdue()).toBe(false);
  });

  it('isOverdue false before due', () => {
    const inv = makeInvoice();
    expect(inv.isOverdue()).toBe(false);
  });

  it('isOverdue true after due', () => {
    const inv = reconstitute({
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    expect(inv.isOverdue()).toBe(true);
  });

  it('daysUntilDue 0 when past due', () => {
    const inv = reconstitute({
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    expect(inv.daysUntilDue()).toBe(0);
  });

  it('daysUntilDue positive when future', () => {
    const inv = makeInvoice();
    expect(inv.daysUntilDue()).toBeGreaterThan(0);
  });

  it('daysOverdue 0 when not overdue', () => {
    const inv = makeInvoice();
    expect(inv.daysOverdue()).toBe(0);
  });

  it('daysOverdue positive when overdue', () => {
    const inv = reconstitute({
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    expect(inv.daysOverdue()).toBeGreaterThan(0);
  });
});

describe('VendorInvoiceEntity — lifecycle: send/markViewed/markPaid', () => {
  it('send transitions draft → sent', () => {
    const inv = makeInvoice();
    inv.send(NOW);
    expect(inv.status.isSent()).toBe(true);
  });

  it('markViewed transitions sent → viewed', () => {
    const inv = makeInvoice();
    inv.send(NOW);
    inv.markViewed(NOW);
    expect(inv.status.isViewed()).toBe(true);
  });

  it('markPaid from sent', () => {
    const inv = makeInvoice();
    inv.send(NOW);
    inv.markPaid(NOW);
    expect(inv.status.isPaid()).toBe(true);
    expect(inv.paidAt).toBe(NOW);
  });

  it('markPaid from viewed', () => {
    const inv = makeInvoice();
    inv.send(NOW);
    inv.markViewed(NOW);
    inv.markPaid(NOW);
    expect(inv.status.isPaid()).toBe(true);
  });

  it('markPaid from overdue', () => {
    const inv = reconstitute({
      status: InvoiceStatusVO.overdue(),
    });
    inv.markPaid(NOW);
    expect(inv.status.isPaid()).toBe(true);
  });

  it('markPaid from draft throws', () => {
    const inv = makeInvoice();
    expect(() => inv.markPaid(NOW)).toThrow();
  });
});

describe('VendorInvoiceEntity — markOverdue', () => {
  it('markOverdue does nothing when not overdue', () => {
    const inv = makeInvoice();
    inv.markOverdue(NOW);
    expect(inv.status.isDraft()).toBe(true);
  });

  it('markOverdue transitions when past due', () => {
    const inv = reconstitute({
      status: InvoiceStatusVO.sent(),
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    inv.markOverdue(NOW);
    expect(inv.status.isOverdue()).toBe(true);
  });

  it('markOverdue does nothing when status cannot transition', () => {
    const inv = reconstitute({
      status: InvoiceStatusVO.paid(),
      issueDate: VERY_PAST_ISSUE,
      dueDate: PAST_DUE,
    });
    inv.markOverdue(NOW);
    expect(inv.status.isPaid()).toBe(true);
  });
});

describe('VendorInvoiceEntity — cancel/refund', () => {
  it('cancel transitions to cancelled', () => {
    const inv = makeInvoice();
    inv.cancel('no longer needed', NOW);
    expect(inv.status.isCancelled()).toBe(true);
  });

  it('cancel without reason', () => {
    const inv = makeInvoice();
    inv.cancel(undefined, NOW);
    expect(inv.status.isCancelled()).toBe(true);
  });

  it('refund from paid', () => {
    const inv = reconstitute({ status: InvoiceStatusVO.paid() });
    inv.refund('customer requested', NOW);
    expect(inv.status.isRefunded()).toBe(true);
  });

  it('refund without reason', () => {
    const inv = reconstitute({ status: InvoiceStatusVO.paid() });
    inv.refund(undefined, NOW);
    expect(inv.status.isRefunded()).toBe(true);
  });
});

describe('VendorInvoiceEntity — attachPdf', () => {
  it('attaches pdf URL', () => {
    const inv = makeInvoice();
    inv.attachPdf('https://cdn.example.com/invoice.pdf', NOW);
  });

  it('rejects empty URL', () => {
    const inv = makeInvoice();
    expect(() => inv.attachPdf('', NOW)).toThrow();
    expect(() => inv.attachPdf('   ', NOW)).toThrow();
  });
});

describe('VendorInvoiceEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const inv = VendorInvoiceEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      props: {
        vendorId: VENDOR,
        invoiceNumber: InvoiceNumberVO.reconstitute(INV_NUM),
        type: InvoiceTypeVO.create('commission'),
        status: InvoiceStatusVO.draft(),
        amount: 500,
        taxAmount: 0,
        totalAmount: 500,
        currency: 'BDT',
        issueDate: NOW,
        dueDate: FUTURE_DUE,
      },
      version: 3,
    });
    expect(inv.version).toBe(3);
  });
});

describe('VendorInvoiceEntity — uncovered getters & transition throw', () => {
  it('periodStart/periodEnd getters', () => {
    const inv = reconstitute({
      periodStart: '2025-01-01T00:00:00.000Z',
      periodEnd: '2025-02-01T00:00:00.000Z',
    });
    expect(inv.periodStart).toBe('2025-01-01T00:00:00.000Z');
    expect(inv.periodEnd).toBe('2025-02-01T00:00:00.000Z');
  });

  it('periodStart/periodEnd undefined when not set', () => {
    const inv = makeInvoice();
    expect(inv.periodStart).toBeUndefined();
    expect(inv.periodEnd).toBeUndefined();
  });

  it('orderIds getter', () => {
    const inv = reconstitute({ orderIds: ['o1', 'o2'] });
    expect(inv.orderIds).toEqual(['o1', 'o2']);
  });

  it('notes getter returns undefined when not set', () => {
    const inv = makeInvoice();
    expect(inv.notes).toBeUndefined();
  });

  it('notes getter returns value after cancel with reason', () => {
    const inv = makeInvoice();
    inv.cancel('test-reason', NOW);
    expect(inv.notes).toBe('test-reason');
  });

  it('pdfUrl getter returns undefined when not set', () => {
    const inv = makeInvoice();
    expect(inv.pdfUrl).toBeUndefined();
  });

  it('pdfUrl getter returns url after attach', () => {
    const inv = makeInvoice();
    inv.attachPdf('https://cdn.example.com/invoice.pdf', NOW);
    expect(inv.pdfUrl).toBe('https://cdn.example.com/invoice.pdf');
  });

  it('cancel from cancelled status throws invalid transition (line 191)', () => {
    const inv = reconstitute({ status: InvoiceStatusVO.cancelled() });
    expect(() => inv.cancel('reason', NOW)).toThrow(/Invalid invoice transition/);
  });

  it('refund from draft status throws invalid transition', () => {
    const inv = makeInvoice(); // draft
    expect(() => inv.refund('reason', NOW)).toThrow(/Invalid invoice transition/);
  });
});
