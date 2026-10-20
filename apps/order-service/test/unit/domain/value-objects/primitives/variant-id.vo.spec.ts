import { describe, it, expect } from '@jest/globals';
import { VariantIdVO } from '@domain/primitives/variant-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('VariantIdVO', () => {
  it('creates from valid UUID', () => {
    expect(VariantIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => VariantIdVO.create('')).toThrow(ValidationError);
    expect(() => VariantIdVO.create('')).toThrow('VariantId cannot be empty');
  });
  it('throws for non-UUID', () => {
    expect(() => VariantIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(VariantIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
