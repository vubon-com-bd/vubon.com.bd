/**
 * ProductIdVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';

const VALID_UUID = '11111111-1111-4111-8111-111111111111';

describe('ProductIdVO', () => {
  describe('create()', () => {
    it('creates from valid UUID', () => {
      const vo = ProductIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = ProductIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws for empty string', () => {
      expect(() => ProductIdVO.create('')).toThrow();
    });

    it('throws for whitespace only', () => {
      expect(() => ProductIdVO.create('   ')).toThrow();
    });

    it('throws for invalid format', () => {
      expect(() => ProductIdVO.create('not-a-uuid')).toThrow();
    });

    it('throws for non-UUID string', () => {
      expect(() => ProductIdVO.create('12345')).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = ProductIdVO.reconstitute('any-string');
      expect(vo.value).toBe('any-string');
    });

    it('preserves value exactly', () => {
      const raw = 'ABC-123-XYZ';
      const vo = ProductIdVO.reconstitute(raw);
      expect(vo.value).toBe(raw);
    });
  });

  describe('equals()', () => {
    it('returns true for same value', () => {
      const a = ProductIdVO.create(VALID_UUID);
      const b = ProductIdVO.create(VALID_UUID);
      expect(a.equals(b)).toBe(true);
    });

    it('returns false for different value', () => {
      const a = ProductIdVO.create(VALID_UUID);
      const b = ProductIdVO.create('22222222-2222-4222-8222-222222222222');
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toJSON()', () => {
    it('returns the raw string', () => {
      const vo = ProductIdVO.create(VALID_UUID);
      expect(vo.toJSON()).toBe(VALID_UUID);
    });
  });
});
