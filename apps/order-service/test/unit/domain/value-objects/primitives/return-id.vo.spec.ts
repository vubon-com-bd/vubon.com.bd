import { describe, it, expect } from '@jest/globals';
import { ReturnIdVO } from '@domain/primitives/return-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('ReturnIdVO', () => {
  it('creates from valid UUID', () => {
    expect(ReturnIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => ReturnIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => ReturnIdVO.create('abc')).toThrow(ValidationError);
  });
});
