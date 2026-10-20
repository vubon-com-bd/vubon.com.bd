/**
 * CheckoutIdVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutIdVO } from '@domain/primitives/checkout-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('CheckoutIdVO', () => {
  describe('create', () => {
    it('creates from valid UUID', () => {
      expect(CheckoutIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });
    it('trims whitespace', () => {
      expect(CheckoutIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
    });
    it('throws for empty', () => {
      expect(() => CheckoutIdVO.create('')).toThrow(ValidationError);
    });
    it('throws for non-UUID', () => {
      expect(() => CheckoutIdVO.create('abc')).toThrow(ValidationError);
    });
  });
  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(CheckoutIdVO.reconstitute('legacy').value).toBe('legacy');
    });
  });
});
