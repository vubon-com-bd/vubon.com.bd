/**
 * ShippingAddressVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ShippingAddressVO } from '@domain/composites/shipping-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureShippingAddressId } from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof ShippingAddressVO.create>[0]> = {}) {
  return {
    id: fixtureShippingAddressId,
    recipientName: 'John Doe',
    phone: '01712345678',
    line1: '123 Main Street',
    city: 'Dhaka',
    country: 'BD',
    ...overrides,
  };
}

describe('ShippingAddressVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = ShippingAddressVO.create(makeProps());
      expect(vo.recipientName).toBe('John Doe');
      expect(vo.phone).toBe('01712345678');
      expect(vo.city).toBe('Dhaka');
      expect(vo.country).toBe('BD');
    });

    it('creates with optional fields', () => {
      const vo = ShippingAddressVO.create(
        makeProps({
          line2: 'Apt 5B',
          district: 'Dhaka',
          division: 'Dhaka',
          postalCode: '1000',
        }),
      );
      expect(vo.line2).toBe('Apt 5B');
      expect(vo.postalCode).toBe('1000');
    });

    it('throws for short recipientName', () => {
      expect(() => ShippingAddressVO.create(makeProps({ recipientName: 'J' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for short phone', () => {
      expect(() => ShippingAddressVO.create(makeProps({ phone: '123' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for short line1', () => {
      expect(() => ShippingAddressVO.create(makeProps({ line1: 'ab' }))).toThrow(
        ValidationError,
      );
    });

    it('throws for short city', () => {
      expect(() => ShippingAddressVO.create(makeProps({ city: 'D' }))).toThrow(ValidationError);
    });

    it('throws for invalid country', () => {
      expect(() => ShippingAddressVO.create(makeProps({ country: 'X' }))).toThrow(ValidationError);
    });
  });

  describe('oneLine', () => {
    it('joins non-empty fields with comma', () => {
      const vo = ShippingAddressVO.create(
        makeProps({ line2: 'Apt 5B', district: 'Dhaka', postalCode: '1000' }),
      );
      expect(vo.oneLine).toBe('123 Main Street, Apt 5B, Dhaka, Dhaka, 1000, BD');
    });

    it('skips empty optional fields', () => {
      const vo = ShippingAddressVO.create(makeProps());
      expect(vo.oneLine).toBe('123 Main Street, Dhaka, BD');
    });
  });

  describe('isSameAs', () => {
    it('true for same fields', () => {
      const a = ShippingAddressVO.create(makeProps());
      const b = ShippingAddressVO.create(makeProps());
      expect(a.isSameAs(b)).toBe(true);
    });

    it('false for different recipientName', () => {
      const a = ShippingAddressVO.create(makeProps());
      const b = ShippingAddressVO.create(makeProps({ recipientName: 'Jane Doe' }));
      expect(a.isSameAs(b)).toBe(false);
    });

    it('false for different line1', () => {
      const a = ShippingAddressVO.create(makeProps());
      const b = ShippingAddressVO.create(makeProps({ line1: '456 Different St' }));
      expect(a.isSameAs(b)).toBe(false);
    });
  });
});
