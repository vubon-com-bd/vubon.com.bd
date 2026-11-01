/**
 * IdempotencyKeyVO tests — 0% coverage fix
 */
import { describe, it, expect } from '@jest/globals';
import { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('IdempotencyKeyVO', () => {
  const VALID_KEY = 'a1b2c3d4-e5f6-4789-9abc-def012345678';
  const VALID_KEY_2 = '11111111-2222-4333-8444-555555555555';

  it('create() accepts valid UUID', () => {
    const vo = IdempotencyKeyVO.create(VALID_KEY);
    expect(vo.value).toBe(VALID_KEY);
  });

  it('create() trims whitespace', () => {
    const vo = IdempotencyKeyVO.create(`  ${VALID_KEY}  `);
    expect(vo.value).toBe(VALID_KEY);
  });

  it('create() throws on empty string', () => {
    expect(() => IdempotencyKeyVO.create('')).toThrow(ValidationError);
  });

  it('create() throws on whitespace only', () => {
    expect(() => IdempotencyKeyVO.create('   ')).toThrow(ValidationError);
  });

  it('create() throws on invalid format', () => {
    expect(() => IdempotencyKeyVO.create('not-a-uuid')).toThrow(ValidationError);
  });

  it('create() throws on non-string', () => {
    expect(() => IdempotencyKeyVO.create(null as never)).toThrow(ValidationError);
    expect(() => IdempotencyKeyVO.create(123 as never)).toThrow(ValidationError);
    expect(() => IdempotencyKeyVO.create(undefined as never)).toThrow(ValidationError);
  });

  it('reconstitute() bypasses validation', () => {
    const vo = IdempotencyKeyVO.reconstitute('anything-goes');
    expect(vo.value).toBe('anything-goes');
  });

  it('equals() true for same value', () => {
    expect(IdempotencyKeyVO.create(VALID_KEY).equals(IdempotencyKeyVO.create(VALID_KEY))).toBe(true);
  });

  it('equals() false for different values', () => {
    expect(IdempotencyKeyVO.create(VALID_KEY).equals(IdempotencyKeyVO.create(VALID_KEY_2))).toBe(false);
  });

  it('toString() returns value', () => {
    expect(IdempotencyKeyVO.create(VALID_KEY).toString()).toBe(VALID_KEY);
  });

  it('toJSON() returns value', () => {
    expect(IdempotencyKeyVO.create(VALID_KEY).toJSON()).toBe(VALID_KEY);
  });
});
