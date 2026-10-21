/**
 * InvoiceStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('InvoiceStatusVO', () => {
  describe('create()', () => {
    it('accepts all statuses', () => {
      for (const s of ['draft', 'issued', 'paid', 'overdue', 'void', 'refunded']) {
        expect(InvoiceStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(InvoiceStatusVO.create('DRAFT').value).toBe('draft');
    });
    it('throws on invalid', () => {
      expect(() => InvoiceStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('draft()', () => expect(InvoiceStatusVO.draft().value).toBe('draft'));
    it('issued()', () => expect(InvoiceStatusVO.issued().value).toBe('issued'));
    it('paid()', () => expect(InvoiceStatusVO.paid().value).toBe('paid'));
    it('overdue()', () => expect(InvoiceStatusVO.overdue().value).toBe('overdue'));
    it('void()', () => expect(InvoiceStatusVO.void().value).toBe('void'));
    it('refunded()', () => expect(InvoiceStatusVO.refunded().value).toBe('refunded'));
  });

  describe('predicates', () => {
    it('isDraft', () => expect(InvoiceStatusVO.draft().isDraft()).toBe(true));
    it('isIssued', () => expect(InvoiceStatusVO.issued().isIssued()).toBe(true));
    it('isPaid', () => expect(InvoiceStatusVO.paid().isPaid()).toBe(true));
    it('isOverdue', () => expect(InvoiceStatusVO.overdue().isOverdue()).toBe(true));
    it('isVoid', () => expect(InvoiceStatusVO.void().isVoid()).toBe(true));
    it('isRefunded', () => expect(InvoiceStatusVO.refunded().isRefunded()).toBe(true));
  });

  describe('isFinal', () => {
    it('true for paid/void/refunded', () => {
      expect(InvoiceStatusVO.paid().isFinal()).toBe(true);
      expect(InvoiceStatusVO.void().isFinal()).toBe(true);
      expect(InvoiceStatusVO.refunded().isFinal()).toBe(true);
    });
    it('false for draft/issued/overdue', () => {
      expect(InvoiceStatusVO.draft().isFinal()).toBe(false);
      expect(InvoiceStatusVO.issued().isFinal()).toBe(false);
      expect(InvoiceStatusVO.overdue().isFinal()).toBe(false);
    });
  });

  describe('isPayable', () => {
    it('true for issued/overdue', () => {
      expect(InvoiceStatusVO.issued().isPayable()).toBe(true);
      expect(InvoiceStatusVO.overdue().isPayable()).toBe(true);
    });
    it('false for draft/paid/void', () => {
      expect(InvoiceStatusVO.draft().isPayable()).toBe(false);
      expect(InvoiceStatusVO.paid().isPayable()).toBe(false);
      expect(InvoiceStatusVO.void().isPayable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('draft → issued ok', () => {
      expect(InvoiceStatusVO.draft().canTransitionTo('issued')).toBe(true);
    });
    it('issued → paid ok', () => {
      expect(InvoiceStatusVO.issued().canTransitionTo('paid')).toBe(true);
    });
    it('issued → overdue ok', () => {
      expect(InvoiceStatusVO.issued().canTransitionTo('overdue')).toBe(true);
    });
    it('overdue → paid ok', () => {
      expect(InvoiceStatusVO.overdue().canTransitionTo('paid')).toBe(true);
    });
    it('paid → refunded ok', () => {
      expect(InvoiceStatusVO.paid().canTransitionTo('refunded')).toBe(true);
    });
    it('paid → draft NOT ok', () => {
      expect(InvoiceStatusVO.paid().canTransitionTo('draft')).toBe(false);
    });
    it('void → anything NOT ok', () => {
      expect(InvoiceStatusVO.void().canTransitionTo('issued')).toBe(false);
    });
    it('refunded → anything NOT ok', () => {
      expect(InvoiceStatusVO.refunded().canTransitionTo('issued')).toBe(false);
    });
  });
});
