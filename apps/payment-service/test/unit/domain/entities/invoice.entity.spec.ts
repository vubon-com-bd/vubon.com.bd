/**
 * InvoiceEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceEntity } from '@domain/entities/invoice.entity';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeInvoice(): InvoiceEntity {
  return InvoiceEntity.create({
    id: InvoiceIdVO.create(TEST_IDS.INVOICE_ID),
    props: {
      invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
      amount: InvoiceAmountVO.create(100, 15, 'BDT'),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
    },
    now: TEST_DATES.NOW,
  });
}

describe('InvoiceEntity', () => {
  describe('create()', () => {
    it('creates draft invoice', () => {
      const i = makeInvoice();
      expect(i.status.isDraft()).toBe(true);
      expect(i.amount.total).toBe(115);
    });
  });

  describe('issue()', () => {
    it('draft → issued', () => {
      const i = makeInvoice();
      i.issue(TEST_DATES.NOW);
      expect(i.isPayable()).toBe(true);
      expect(i.issuedAt).toBe(TEST_DATES.NOW);
    });
  });

  describe('markPaid()', () => {
    it('issued → paid', () => {
      const i = makeInvoice();
      i.issue(TEST_DATES.YESTERDAY);
      i.markPaid(TEST_DATES.NOW);
      expect(i.isPaid()).toBe(true);
      expect(i.paidAt).toBe(TEST_DATES.NOW);
    });
    it('throws from draft', () => {
      const i = makeInvoice();
      expect(() => i.markPaid(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('markOverdue()', () => {
    it('issued → overdue', () => {
      const i = makeInvoice();
      i.issue(TEST_DATES.YESTERDAY);
      i.markOverdue(TEST_DATES.NOW);
      expect(i.isOverdue()).toBe(true);
    });
  });

  describe('void()', () => {
    it('draft → void', () => {
      const i = makeInvoice();
      i.void(TEST_DATES.NOW);
      expect(i.status.isVoid()).toBe(true);
    });
    it('issued → void', () => {
      const i = makeInvoice();
      i.issue(TEST_DATES.YESTERDAY);
      i.void(TEST_DATES.NOW);
      expect(i.status.isVoid()).toBe(true);
    });
  });

  describe('refund()', () => {
    it('paid → refunded', () => {
      const i = makeInvoice();
      i.issue(TEST_DATES.YESTERDAY);
      i.markPaid(TEST_DATES.NOW);
      i.refund(TEST_DATES.NOW);
      expect(i.status.isRefunded()).toBe(true);
      expect(i.refundedAt).toBe(TEST_DATES.NOW);
    });
    it('throws from draft', () => {
      const i = makeInvoice();
      expect(() => i.refund(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds paid state', () => {
      const i = InvoiceEntity.reconstitute({
        id: TEST_IDS.INVOICE_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
          status: InvoiceStatusVO.paid(),
          amount: InvoiceAmountVO.reconstitute(100, 15, 115, 'BDT'),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          issuedAt: TEST_DATES.YESTERDAY,
          paidAt: TEST_DATES.NOW,
        },
      });
      expect(i.isPaid()).toBe(true);
    });
  });
});
