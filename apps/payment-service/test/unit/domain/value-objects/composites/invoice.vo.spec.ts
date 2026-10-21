/**
 * InvoiceVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceVO } from '@domain/composites/invoice.vo';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof InvoiceVO.create>[0]> = {}) {
  return {
    id: InvoiceIdVO.create(TEST_IDS.INVOICE_ID),
    invoiceNumber: InvoiceNumberVO.create(TEST_IDS.INVOICE_NUMBER),
    status: InvoiceStatusVO.draft(),
    amount: InvoiceAmountVO.create(100, 15, 'BDT'),
    userId: UserIdVO.create(TEST_IDS.USER_ID),
    orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('InvoiceVO', () => {
  describe('create()', () => {
    it('creates valid invoice', () => {
      const vo = InvoiceVO.create(makeProps());
      expect(vo.invoiceNumber.value).toBe(TEST_IDS.INVOICE_NUMBER);
      expect(vo.amount.total).toBe(115);
    });
    it('throws when issued without issuedAt', () => {
      expect(() =>
        InvoiceVO.create(makeProps({ status: InvoiceStatusVO.issued() })),
      ).toThrow(ValidationError);
    });
    it('accepts issued with issuedAt', () => {
      const vo = InvoiceVO.create(
        makeProps({ status: InvoiceStatusVO.issued(), issuedAt: TEST_DATES.NOW }),
      );
      expect(vo.issuedAt).toBe(TEST_DATES.NOW);
    });
    it('throws when paid without paidAt', () => {
      expect(() =>
        InvoiceVO.create(
          makeProps({
            status: InvoiceStatusVO.paid(),
            issuedAt: TEST_DATES.YESTERDAY,
          }),
        ),
      ).toThrow(ValidationError);
    });
    it('accepts paid with all timestamps', () => {
      const vo = InvoiceVO.create(
        makeProps({
          status: InvoiceStatusVO.paid(),
          issuedAt: TEST_DATES.YESTERDAY,
          paidAt: TEST_DATES.NOW,
        }),
      );
      expect(vo.isPaid()).toBe(true);
    });
    it('throws when dueAt < issuedAt', () => {
      expect(() =>
        InvoiceVO.create(
          makeProps({
            issuedAt: TEST_DATES.NOW,
            dueAt: TEST_DATES.YESTERDAY,
          }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = InvoiceVO.reconstitute(
        makeProps({ status: InvoiceStatusVO.issued() }),
      );
      expect(vo.status.value).toBe('issued');
    });
  });

  describe('predicates', () => {
    it('isPayable for issued', () => {
      const vo = InvoiceVO.create(
        makeProps({ status: InvoiceStatusVO.issued(), issuedAt: TEST_DATES.NOW }),
      );
      expect(vo.isPayable()).toBe(true);
    });
    it('isFinal for paid', () => {
      const vo = InvoiceVO.create(
        makeProps({
          status: InvoiceStatusVO.paid(),
          issuedAt: TEST_DATES.YESTERDAY,
          paidAt: TEST_DATES.NOW,
        }),
      );
      expect(vo.isFinal()).toBe(true);
    });
  });
});
