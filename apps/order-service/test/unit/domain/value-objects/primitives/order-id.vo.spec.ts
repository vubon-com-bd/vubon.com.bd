/**
 * OrderIdVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';
const ANOTHER_UUID = '660f9511-f3ac-52e5-b827-557766551111';

describe('OrderIdVO', () => {
  describe('create', () => {
    it('creates VO from a valid UUID', () => {
      const vo = OrderIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace before validating', () => {
      const vo = OrderIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws ValidationError for empty string', () => {
      expect(() => OrderIdVO.create('')).toThrow(ValidationError);
      expect(() => OrderIdVO.create('')).toThrow('OrderId cannot be empty');
    });

    it('throws ValidationError for whitespace-only string', () => {
      expect(() => OrderIdVO.create('   ')).toThrow(ValidationError);
    });

    it('throws ValidationError for non-UUID string', () => {
      expect(() => OrderIdVO.create('not-a-uuid')).toThrow(ValidationError);
      expect(() => OrderIdVO.create('not-a-uuid')).toThrow('OrderId must be a valid UUID');
    });

    it('throws ValidationError for non-string input', () => {
      expect(() => OrderIdVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation (trusted DB source)', () => {
      const vo = OrderIdVO.reconstitute('any-value');
      expect(vo.value).toBe('any-value');
    });
  });

  describe('equality', () => {
    it('equals same UUID', () => {
      const a = OrderIdVO.create(VALID_UUID);
      const b = OrderIdVO.create(VALID_UUID);
      expect(a.equals(b)).toBe(true);
    });

    it('does not equal different UUID', () => {
      const a = OrderIdVO.create(VALID_UUID);
      const b = OrderIdVO.create(ANOTHER_UUID);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('immutability', () => {
    it('has readonly value', () => {
      const vo = OrderIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });
  });
});

// ─── Additional branch coverage ─────────────
describe('OrderIdVO — branch edge cases', () => {
  it('handles whitespace-only', () => {
    expect(() => OrderIdVO.create('   ')).toThrow(ValidationError);
  });

  it('reconstitute preserves any string', () => {
    const vo = OrderIdVO.reconstitute('');
    expect(vo.value).toBe('');
  });

  it('reconstitute preserves non-UUID', () => {
    const vo = OrderIdVO.reconstitute('not-a-uuid');
    expect(vo.value).toBe('not-a-uuid');
  });

  it('value getter returns same string', () => {
    const vo = OrderIdVO.create(VALID_UUID);
    expect(vo.value).toBe(VALID_UUID);
    expect(vo.value).toBe(vo.value);
  });

  it('toString returns value', () => {
    const vo = OrderIdVO.create(VALID_UUID);
    expect(vo.toString()).toBe(VALID_UUID);
  });

  it('toJSON returns value', () => {
    const vo = OrderIdVO.create(VALID_UUID);
    expect(vo.toJSON()).toBe(VALID_UUID);
  });
});
