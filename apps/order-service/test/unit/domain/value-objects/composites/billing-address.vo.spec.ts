/**
 * BillingAddressVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { BillingAddressVO } from '@domain/composites/billing-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureBillingAddressId } from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof BillingAddressVO.create>[0]> = {}) {
  return {
    id: fixtureBillingAddressId,
    recipientName: 'Jane Doe',
    phone: '01712345678',
    line1: '456 Billing Street',
    city: 'Chittagong',
    country: 'BD',
    ...overrides,
  };
}

describe('BillingAddressVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = BillingAddressVO.create(makeProps());
      expect(vo.recipientName).toBe('Jane Doe');
      expect(vo.city).toBe('Chittagong');
    });

    it('creates with optional fields', () => {
      const vo = BillingAddressVO.create(
        makeProps({ line2: 'Suite 100', district: 'Chittagong', postalCode: '4000' }),
      );
      expect(vo.line2).toBe('Suite 100');
      expect(vo.postalCode).toBe('4000');
    });

    it('throws for short recipientName', () => {
      expect(() => BillingAddressVO.create(makeProps({ recipientName: 'J' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for short phone', () => {
      expect(() => BillingAddressVO.create(makeProps({ phone: '123' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for short line1', () => {
      expect(() => BillingAddressVO.create(makeProps({ line1: 'ab' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for invalid country', () => {
      expect(() => BillingAddressVO.create(makeProps({ country: 'X' }))).toThrow(ValidationError);
    });
  });

  describe('oneLine', () => {
    it('joins non-empty fields', () => {
      const vo = BillingAddressVO.create(
        makeProps({ line2: 'Suite 100', postalCode: '4000' }),
      );
      expect(vo.oneLine).toBe('456 Billing Street, Suite 100, Chittagong, 4000, BD');
    });
  });
});
